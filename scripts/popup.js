window.onload = function(){

	document.querySelector('#getData').onclick = function(element){
		let msg = {
			txt : "getData"
		};
		// chrome.tabs.sendMessage(tab.id, msg);
		chrome.tabs.query({currentWindow: true, active: true},
			function(tabs){
			// console.log("foo");
				chrome.tabs.sendMessage(tabs[0].id, msg);
			});

	}

};
