

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
	
	// Identify days of week for particular class 
	// Class Object should hold only one day 
	// Separate if more than one, could be more than 1 day.
	var times = classDataString[i][11];

	// Separate Start date from End date ["xx/xx/xxxx","-","xx/xx/xxxx"]
	var term = classDataString[i][14].split(" ");

	// Retrieves Hours: Minutes
	// Retrives Day Abbreviations
	// Iterate through all abbreviations splitting into different class objects
	var sessions = times.substring(times.indexOf(' ') + 1).split(" ");

	var daysOfWeek = times.indexOf(' ')+1;

	for( var day = 0;day< daysOfWeek-1;day+=2)
	{
		classDict["courseName"]=	classDataString[i][0];	
		classDict["status"]=		classDataString[i][2];
		classDict["units"]=			classDataString[i][3];
		classDict["style"]=			classDataString[i][10];
		classDict["day"]=			times.substring(day,day+2);
		classDict["startTime"]=			sessions[0];
		classDict["endTime"]=			sessions[2];
		classDict["location"]=		classDataString[i][12];
		classDict["instructor"]=	classDataString[i][13];

		

		
		classDict["startDate"]=			term[0];
		classDict["endDate"]=			term[2];
		classData.push(classDict);
		classDict={};
	}

	
	// If class has an additional Discussion/Lab Section
	if(classDataString[i].length > 16)	
	{
		times = classDataString[i][18];
		sessions = times.substring(times.indexOf(' ') + 1).split(" ");
		daysOfWeek = times.indexOf(' ')+1;
		for( var day = 0;day< daysOfWeek-1;day+=2)
		{
			classDict = {};
			classDict["courseName"]=	classDataString[i][0];	
			classDict["status"]=		classDataString[i][2];
			classDict["units"]=			classDataString[i][3];
			classDict["style"]=			classDataString[i][17];
			classDict["day"]=			times.substring(day,day+2);
			classDict["startTime"]=			sessions[0];
			classDict["endTime"]=			sessions[2];
			classDict["location"]=		classDataString[i][19];
			classDict["instructor"]=	classDataString[i][20];
			
			classDict["startDate"]=			term[0];
			classDict["endDate"]=			term[2];
			classData.push(classDict);
			classDict={};
		}
	}

	// Adds Course Information to list
	

}
