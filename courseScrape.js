// Collects each course box with all data inside - including options box
var classInfo = document.getElementsByClassName("PSGROUPBOXWBO");

// Collects course full name - ID
var classTitleName=[];


// Converts HTMLCollection object into an Array of table objects
classInfo=[].slice.call(classInfo);

// Truncates Options box from course list
classInfo.shift();

// Holds parsable strings
var classDataString=[];

// Holds Data
var classData=[];

for(var i=0;i<classInfo.length;i++)
{
	// Temporary object that will hold information of class
	var classDict = {};

	// Collects strings that are divided by a new line
	classDataString.push(classInfo[i].innerText.split("\n"));

	/*
		0 - Course name and ID 			[courseName]
		2 - Waitlist or Enrolled		[status]
		3 - units 						[units]

		10 - Discussion / Activity 		[style]
		11 - Dates (Abbrev) and times	[times]
		12 - Location					[location]
		13 - Instructor 				[instructor]
		14 - Start/End Dates 			[term]

		17 - Discussion / Activity 		[style2]
		18 - Dates (Abbrev) and times	[times2]
		19 - location 					[location2]
		20 - instructor 				[instructor2]
		21 - Start/End Dates 			[term2]
	*/
	classDict["courseName"]=	classDataString[i][0]	
	classDict["status"]=		classDataString[i][2]
	classDict["units"]=			classDataString[i][3]
	classDict["style"]=			classDataString[i][10]
	classDict["times"]=			classDataString[i][11]
	classDict["location"]=		classDataString[i][12]
	classDict["instructor"]=	classDataString[i][13]
	classDict["term"]=			classDataString[i][14]

	if(classDataString[i].length > 16)	
	{
		classDict["style2"]=		classDataString[i][17]
		classDict["times2"]=		classDataString[i][18]
		classDict["location2"]=		classDataString[i][19]
		classDict["instructor2"]=	classDataString[i][20]
		classDict["term2"]=			classDataString[i][21]
	}

	// Adds Course Information to list
	classData.push(classDict);

}



