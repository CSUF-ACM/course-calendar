chrome.runtime.onMessage.addListener(function (message) {
	let reply = {
			"txt": "fail"
		}
		//only execute if on appropriate page in student portal
	if (document.getElementsByTagName("title")[0].innerText == "My Class Schedule") {
		if (message.txt == "getData") {

			//message reply
			reply.txt = "success";

			//exit if button already pushed by checking if generated button exists
			if (top.document.querySelectorAll("frame")[1].contentDocument.querySelectorAll("#Download-Form").length > 0) {
				console.log("Data allready collected: cancelling request");
				chrome.runtime.sendMessage(reply);
				return;
			} else {
				console.log("Collecting Data");
			}

			//add stylesheet to documnet
			var style = document.createElement('link');
			style.rel = 'stylesheet';
			style.type = 'text/css';
			style.href = chrome.extension.getURL('styles/content.css');
			(top.document.querySelectorAll("frame")[1].contentDocument.head || top.document.querySelectorAll("frame")[1].contentDocument.documentElement).appendChild(style);


			// Collects each course box with all data inside - including options box
			let rawDomData = top.document.querySelectorAll("frame")[1].contentDocument.querySelectorAll(".PSGROUPBOXWBO");

			// Converts HTMLCollection object into an Array of table objects
			rawDomData = [].slice.call(rawDomData);

			// Truncate and save Options box from course list
			let optionsBox = rawDomData.shift();

			if(rawDomData,length = 0 || optionsBox == undefined){
				reply.txt = "fail";
				chrome.runtime.sendMessage(reply);
				return;
			}


			//array to store schedule data
			let scheduleData = [];
			//format list for day checking
			let daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

			//loop for every course in HTMLCollection
			for (let i = 0; i < rawDomData.length; i++) {

				//object to store course data
				let courseObj = {};

				//get Title
				courseObj["title"] = rawDomData[i].querySelector(".PAGROUPDIVIDER").innerText; //Class Title Header

				//collect table headers and their corresponding column data
				let courseHeaders = [].slice.call(rawDomData[i].querySelectorAll(".PSLEVEL3GRIDWBO .PSLEVEL3GRIDCOLUMNHDR"));
				let courseData = [].slice.call(rawDomData[i].querySelectorAll(".PSLEVEL3GRIDWBO .PSLEVEL2GRIDODDROW"));

				//store information into course data object
				for (let j = 0; j < courseHeaders.length; j++) {
					courseObj[courseHeaders[j].innerText] = courseData[j].innerText;
				}

				//split start and end dates
				courseObj["Start/End Date"] = courseObj["Start/End Date"].split(" - ");

				//split days and times
				courseObj['Days'] = courseObj["Days & Times"].split(" ")[0].toUpperCase().match(/.{1,2}/g);
				courseObj['TimeStart'] = courseObj["Days & Times"].split(" ")[1];
				courseObj['TimeEnd'] = courseObj["Days & Times"].split(" ")[3];

				//format time strings
				let len = courseObj['TimeStart'].length;
				courseObj['TimeStart'] = courseObj['TimeStart'].substring(0, len - 2) + " " + courseObj['TimeStart'].substring(len - 2, len);
				len = courseObj['TimeEnd'].length;
				courseObj['TimeEnd'] = courseObj['TimeEnd'].substring(0, len - 2) + " " + courseObj['TimeEnd'].substring(len - 2, len);

				//format and correct start dates
				let start = new Date(courseObj["Start/End Date"][0] + " " + courseObj['TimeStart']);
				let end = new Date(courseObj["Start/End Date"][0] + " " + courseObj['TimeEnd']);

				while (courseObj['Days'].indexOf(daysOfWeek[start.getDay()]) < 0) {
					start.setDate(start.getDate() + 1);
				}
				while (courseObj['Days'].indexOf(daysOfWeek[end.getDay()]) < 0) {
					end.setDate(end.getDate() + 1);
				}

				//format end date
				courseObj["End Date"] = new Date(courseObj["Start/End Date"][1]);
				courseObj["End Date"].setDate(courseObj["End Date"].getDate() + 1); //increment end by 1 day
				courseObj["Start"] = start;
				courseObj["End"] = end;

				//push data to schedule object
				scheduleData.push(courseObj);

			}
			// console.log(scheduleData);



			//debugging
			// console.log(optionsBox);
			// let newNode = document.createElement("div");
			// newNode.appendChild(document.createElement("pre").appendChild(
			// 	document.createTextNode(JSON.stringify(scheduleData, null, 2))
			// ));
			// optionsBox.appendChild(newNode);


			//form object to append to options box
			let downloadForm = document.createElement("form");
			downloadForm.setAttribute("id", "Download-Form")
			downloadForm.style.width = '100%';
			let downloadHeader = document.createElement("h1");
			downloadHeader.innerText = "Calendar Export Options";
			downloadForm.appendChild(downloadHeader);

			//checkboxes
			let fieldset = document.createElement("fieldset");
			downloadForm.appendChild(fieldset);

			for (let i = 0; i < scheduleData.length; i++) {
				let label = document.createElement("label");
				let checkbox = document.createElement("input");
				checkbox.setAttribute("type", "checkbox");
				checkbox.setAttribute("class", "class-check");
				checkbox.setAttribute("checked", "checked");
				checkbox.setAttribute("value", i);
				label.innerHTML = checkbox.outerHTML + scheduleData[i]["title"];
				fieldset.appendChild(label);
			}

			//download button
			let btn = document.createElement("input");
			btn.setAttribute("value", "Download Course Calendar");
			btn.setAttribute("type", "button");
			btn.setAttribute("id", "Download-Btn");

			//create and download calendar on click
			btn.addEventListener("click", function () {
				//collect checked boxes
				let checkedClasses = top.document.querySelectorAll("frame")[1].contentDocument.querySelectorAll(".class-check:checked");

				//ics calendar object
				let cal = ics();

				//add events for checked boxes
				for (let index of checkedClasses) {
					//create event params
					let subject, desctiption, location, begin, end, rrule;
					subject = scheduleData[index.value]["title"];
					desctiption = scheduleData[index.value]['Instructor'];
					location = scheduleData[index.value]["Room"];
					begin = scheduleData[index.value]["Start"];
					end = scheduleData[index.value]["End"];


					//recurrence rules
					rrule = {};
					rrule["freq"] = "WEEKLY";
					rrule["until"] = scheduleData[index.value]["End Date"];
					rrule["byday"] = scheduleData[index.value]["Days"];

					//add event to ics object
					cal.addEvent(subject, desctiption, location, begin, end, rrule);

				}


				//download ics file
				cal.download("My Class Schedule");
			});

			//add button to form
			downloadForm.appendChild(btn);

			//add form to Documnent after optionsBox
			optionsBox.parentNode.insertBefore(downloadForm, optionsBox.nextSibling);

		}
	}

	chrome.runtime.sendMessage(reply);
});