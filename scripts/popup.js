var classData=[];

// chrome.runtime.onMessage.addListener(receiver);
// function receiver(request, sender, sendResponse)
// {
//   console.log(request);
//   classData=JSON.parse(request);
//   console.log(classData);
// }
// Client ID and API key from the Developer Console
var CLIENT_ID = '**';
var API_KEY = '**';

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

authorizeButton.onclick=signIn;
signOutButton.onclick = signOut;
scrapeButton.onclick=scrapePage;
syncButton.onclick=syncCalendar;

function signIn(event)
{
  authorizeButton.style.display='none';
  introduction.style.display='none';
  scrapeButton.style.display='block';
  syncButton.style.display='block';
  signOutButton.style.display='block';

}
function signOut(event)
{
  authorizeButton.style.display='block';
  introduction.style.display='block';
  scrapeButton.style.display='none';
  syncButton.style.display='none';
  signOutButton.style.display='none';
}
function scrapePage(event)
{

}
function syncCalendar(event)
{

}