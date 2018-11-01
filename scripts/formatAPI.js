
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


/* getTimeString(timepoint)
	Input Pararmeters: 		"8:45PM"
			   Output: 		"20:45:00"
				-24 hour scheme
*/

function getTimeString(timePoint)
{	
	var timeString="";
	var pHour = parseInt(timePoint.split(":")[0]);
	var pMin  = timePoint.split(":")[1].substring(0,2);
	
	if(timePoint.search("PM") != -1)
	{
		if(pHour!=12)
			pHour+=12;
		
		timeString+=(pHour).toString();
	}
	else
	{	if(pHour<10)
			timeString+="0" + (pHour).toString();
		else
			timeString+=(pHour).toString();
	}

	timeString+=":"+pMin+":00";

	return timeString;
}
/* getDateString(date,day)
	Input Pararmeters: 		"8/25/2018","Mo"
			   Output: 		"2018-08-27"
				-xxxx-xx-xx format
				-Add two days to original date pointing to Monday 
*/

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

/* parseDateEvent(classDate,classTime,classDay)
	Input Pararmeters: 		"8/25/2018","8:45PM","Mo"
			   Output: 		"2018-08-27T20:45-07:00"
				-Combines two date and time string 
				-Keep functions organized
*/
function parseDateEvent(classDate,classTime,classDay)
{
	
	var timeEvent = getTimeString(classTime);
	var dateEvent = getDateString(classDate,classDay);
	return dateEvent+"T"+timeEvent;
}

var classEvents=[];
for(classEvent of classData){
	
	var event={
		"summary":classEvent["courseName"],
		"description":classEvent["location"],

		"start":{
			"dateTime":parseDateEvent(classEvent["startDate"],classEvent["startTime"],classEvent["day"]),
			"timeZone":"America/Los_Angeles"
		},
		"end":{
			"dateTime":parseDateEvent(classEvent["startDate"],classEvent["endTime"],classEvent["day"]),
			"timeZone":"America/Los_Angeles"
		},
		"recurrence":[
			"RRULE:FREQ=WEEKLY;UNTIL="+getDateString(classEvent["endDate"],classEvent["day"]).replace(/-/g,"")
		],
	}
	
	classEvents.push(event);
}

function deliverData(){
	var jsonData = JSON.stringify(classEvents);
	var message={
		text:jsonData
	};
	chrome.runtime.sendMessage(message);


}