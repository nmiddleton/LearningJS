/**
 * Created by U8013621 on 17/06/2014.
 */
inputyear = window.prompt("Enter a year : ");

var result = " not ";
if (inputyear % 4 === 0) result = " ";
alert(inputyear + " is" + result + "a leapyear");

