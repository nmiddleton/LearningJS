/**
 * Created by U8013621 on 17/06/2014.
 */
'use strict';


module.exports = function generateRandomNumber1_10(){
    // returns  random number between 1,2,3,4,5,6,7,8,9,10
    return Math.ceil(Math.random() * 10);
};

module.exports = function NumGuesser () {
    var num = generateRandomNumber1_10();
    var inputnum = window.prompt("Guess the number between 1 and 10 : ");

    if (inputnum == num) alert(num + " is right! Good work!");
    else alert(inputnum + " is not right. The secret was " + num + ". Bad luck!");
};