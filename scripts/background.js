// chrome.runtime.onInstalled.addListener(function() {

//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//         chrome.declarativeContent.onPageChanged.addRules([{
//             conditions: [new chrome.declarativeContent.PageStateMatcher({
//                 pageUrl: {
//                     hostEquals: 'mycsuf.fullerton.edu'
//                 },
//             })],
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//         }]);
//     });
// });

chrome.runtime.onMessage.addListener(
    function(message, callback){
        if(message == 'getData'){
            chrome.tabs.executeScript({
               file:"getData.js"
            });
        }
    }
    );