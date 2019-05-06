window.onload = function(){

	let el_button = document.querySelector('#getData');
	chrome.tabs.query( {currentWindow: true, active: true}, function(tabs){
		console.log(tabs);
	    if(!tabs[0].url.match(/https:\/\/mycsuf\.fullerton\.edu\/psp\/pfulprd\/EMPLOYEE\/CFULPRD\/c\/SA_LEARNER_SERVICES\.SSS_STUDENT_CENTER\.GBL[*]?/)){
	        el_button.disabled = true;
	        console.log("disabled");
	    }
	});

	//add click listener for button to send message
	document.querySelector('#getData').onclick = function(element){
		let msg = {
			txt : "getData"
		};
		chrome.tabs.query({currentWindow: true, active: true},
			function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, msg);
			});

	}

	//succes/fail notifications
	let el_fail = document.querySelector(".fail");
	let el_success = document.querySelector(".success");

	chrome.runtime.onMessage.addListener(function(message){
		if(message.txt == "success"){
			el_success.classList.remove("hide");
			setTimeout(function(){el_success.classList.add("hide");},2500);
		}else if(message.txt == "fail"){
			el_fail.classList.remove("hide");
			setTimeout(function(){el_fail.classList.add("hide");},2500);
		}
	});


};
