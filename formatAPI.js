
//console.log(classData);
//Summary
//Location
//Description
//Start : dateTime: 2015-08-28T09:00:00-07:00
//		  timeZone: America/Los_Angeles
//End : dateTime: 2015-08-28T09:00:00-07:00
//		  timeZone: America/Los_Angeles
//recurrence :["RRULE:FREQ=WEEKLY;UNTIL=20110617T065959Z"]
//
//
//Format Information into Parameters

function getTimeString(stime,etime)
{	
	var timeString="";
	var sHour = parseInt(stime.split(":")[0]);
	var sMin  = stime.split(":")[1].substring(0,2);
	var eHour = parseInt(etime.split(":")[0]);
	var eMin  = etime.split(":")[1].substring(0,2);
	
	if(stime.search("PM") != -1)
	{
		if(sHour!=12)
			sHour+=12;
		
		timeString+=(sHour).toString();
	}
	else
	{
		timeString+="0" + (sHour).toString();
	}

	timeString+=":"+sMin+"-";

	if(etime.search("PM") != -1)
	{
		if(eHour!=12)
			eHour+=12;
		timeString+=(eHour).toString();
	}
	else
	{
		timeString+="0" + (eHour).toString();
	}
	timeString+=":"+eMin;
	
	// console.log(timeString);
	return timeString;
}

function getDateString(date,day)
{
	var dateString="";
	var incrementDate=0 ;
	switch(day){
		case "Mo":
			incrementDate=2;
			break;
		case "Tu":
			incrementDate=3;
			break;
		case "We":
			incrementDate=4;
			break;
		case "Th":
			incrementDate=5;
			break;
		case "Fr":
			incrementDate=6;
			break;
		case "Sa":
			incrementDate=0;
			break;
		case "Su":
			incrementDate=1;
			break;
	}
	
	var month = date.substring(0,2);
	var dayOfMonth = date.substring(3,5);
	var overfillCheck = parseInt(dayOfMonth)+incrementDate;
	
	if(overfillCheck > 31)
	{
		overfillCheck-=31;
		dayOfMonth ="0"+ (overfillCheck).toString();
		month = "0"+(parseInt(month)+1).toString();
	}
	else
	{
		dayOfMonth =(overfillCheck).toString();
	}

	var year = date.substring(6);

	dateString=year+"-"+month+"-"+dayOfMonth;
	return dateString;
	
}
function parseDateEvent(classDate,classStartTime,classEndTime,classDay)
{
	
	var timeEvent = getTimeString(classStartTime,classEndTime);
	var dateEvent = getDateString(classDate,classDay);
	return dateEvent+"T"+timeEvent;
}

	//2015-08-28T09:00:00-07:00
	//"08/25/2018" , "Mo 8:00AM - 9:50AM"


var classEvents=[];
for(classEvent of classData){
	
	
	var event={
		"summary":classEvent["courseName"],
		"description":classEvent["location"],

		"start":{
			"dateTime":parseDateEvent(classEvent["startDate"],classEvent["startTime"],classEvent["endTime"],classEvent["day"]),
			"timeZone":"America/Los_Angeles"
		},
		"end":{
			"dateTime":parseDateEvent(classEvent["endDate"],classEvent["startTime"],classEvent["endTime"],classEvent["day"]),
			"timeZone":"America/Los_Angeles"
		},
		"recurrence":[
			"RRULE:FREQ=WEEKLY;"
		],
	}
	
	classEvents.push(event);
}
console.log(classEvents);

var jsonData = JSON.stringify(classEvents);
console.log(jsonData);