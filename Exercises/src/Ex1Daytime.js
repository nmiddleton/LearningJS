/**
 * Created by Dad on 16/06/2014.
 */

var today =  new Date();
var day = today.getDay();
var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

alert( "today is " + daylist[day]);

var hours = today.getHours();
var AMPM = (hours >= 12) ? "PM" : "AM";
(hours >= 12) ? hours = (hours - 12) : hours;
var mins = today.getMinutes();
var secs = today.getSeconds();
alert( "Current Time : " +  hours +":" + mins +":" +secs + " " + AMPM);

