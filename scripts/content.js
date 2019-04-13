chrome.runtime.onMessage.addListener(function (message) {

	if (document.getElementsByTagName("title")[0].innerText == "My Class Schedule") {
		if (message.txt == "getData") {

			// Collects each course box with all data inside - including options box
			let rawDomData = top.document.querySelectorAll("frame")[1].contentDocument.querySelectorAll(".PSGROUPBOXWBO");

			// Converts HTMLCollection object into an Array of table objects
			rawDomData = [].slice.call(rawDomData);

			// Truncate and save Options box from course list
			let optionsBox = rawDomData.shift();

			//array to store schedule data
			let scheduleData = [];

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
				//push data to schedule object
				scheduleData.push(courseObj);


			}

			//create ics object
			let cal = ics();


			for(let course of scheduleData){
				//create event params
				let subject, desctiption, location, begin, end, rrule;
				subject = course["title"];
				desctiption = course['Instructor'];
				location = course["Room"];
				begin = course["Start/End Date"][0] + " " + course['TimeStart'];
				end = course["Start/End Date"][0] + " " + course['TimeEnd'];
				console.log(begin);
				console.log(end);
				//recurrence rules
				rrule = {};
				rrule["freq"] = "WEEKLY";
				rrule["until"] = course["Start/End Date"][1];
				rrule["byday"] = course["Days"];
				//add event
				cal.addEvent(subject, desctiption, location, begin, end, rrule);

			}


			// console.log(optionsBox);
			let newNode = document.createElement("div");
			newNode.appendChild(document.createElement("pre").appendChild(
					document.createTextNode(JSON.stringify(scheduleData, null, 2))
				));
			let btn = document.createElement("BUTTON");
			btn.innerText = "Download Schedule";
			btn.addEventListener("click", function(){cal.download("schedule");});
			optionsBox.appendChild(newNode);
			optionsBox.appendChild(btn);


		}
	}

});
