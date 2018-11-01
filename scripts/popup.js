var classData=[];

// chrome.runtime.onMessage.addListener(receiver);
// function receiver(request, sender, sendResponse)
// {
//   console.log(request);
//   classData=JSON.parse(request);
//   console.log(classData);
// }
// Client ID and API key from the Developer Console
var CLIENT_ID = '886704628314-pjjp6r51o6snovr703kajis3j1prubm8.apps.googleusercontent.com';
var API_KEY = 'AIzaSyClDkasPGtoXboIXVijK8E-beXjiYuh1HU';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";



var authorizeButton = document.getElementById('authorize_button');
var introduction = document.getElementById('intro_text');
var signOutButton = document.getElementById('signout_button');
var scrapeButton = document.getElementById('scrape_button');
var syncButton = document.getElementById('sync_button');


function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
    // birthdayButton.onclick = createBirthdayEvent;
    // courseCalendar.onclick = syncCourses;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    introduction.style.dispaly = 'none';
    signOutButton.style.display = 'block';
    scrapeButton.style.display = 'block';
    syncButton.style.display = 'block';
    
  } else {
    authorizeButton.style.display = 'block';
    introduction.style.dispaly = 'block';
    signOutButton.style.display = 'none';
    scrapeButton.style.display = 'none';
    syncButton.style.display = 'none';
  }
}

 /**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
