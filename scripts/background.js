var classData=[];

chrome.runtime.onMessage.addListener(receiver);
function receiver(request, sender, sendResponse)
{
	console.log(request);
	classData=JSON.parse(request);
	console.log(classData);
}

var CLIENT_ID = '886704628314-pjjp6r51o6snovr703kajis3j1prubm8.apps.googleusercontent.com';
var API_KEY = 'AIzaSyClDkasPGtoXboIXVijK8E-beXjiYuh1HU';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";
