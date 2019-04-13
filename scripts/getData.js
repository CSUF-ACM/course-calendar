
// Collects each course box with all data inside - including options box
let rawDomData = top.document.querySelectorAll("frame")[1].contentDocument.querySelectorAll(".PSGROUPBOXWBO");

// Converts HTMLCollection object into an Array of table objects
rawDomData = [].slice.call(rawDomData);

// Truncates Options box from course list
rawDomData.shift();

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

    //push 
    scheduleData.push(courseObj);

}