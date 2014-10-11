/**
 * Created by u8013621 on 06/10/2014.
 */
// Based on 58of99 http://www.slideshare.net/domenicdenicola/callbacks-promises-and-coroutines-oh-my-the-evolution-of-asynchronicity-in-javascript
var q = require('q');

var BOB = {
    firstname: 'Robert',
    lastname: 'Middleton'
};
function getUser(name, cb) {
    console.log('Getting user..'); // this happens "in time" to be posted second
    setTimeout(
        function () {
            return cb(name); // but the callback happens long enough later it becomes "late"
        }, 2000);
}

//
// ASYNCHRONOUS BY DEFAULT
//

// Happens 1st ?
console.log('Happens 1st');

// Happens 2nd ?
getUser(BOB, function (user) {
    console.log('Happens 2nd ', user.firstname);
});

// Happens 3rd ?
console.log('Happens 3rd');


//
// SYNCHRONOUS WITH PROMISES
//
var count = 4;
function say(text) {
    var deferred = q.defer();
    console.log('Happens ' + count + '[' + text + ']');
    count++;
//    console.log('\n' + text);
    deferred.resolve(text);
    return deferred.promise;
}
function getUserWithPromises() {
    var deferred = q.defer();
    count++;
    setTimeout(
        function () {


            deferred.resolve(BOB.lastname) // but no callback, we return a resolved promise instead
        }, 1000);
    return deferred.promise;
}


q.try(function () {
    return 'hi'; // set up something for say to output
})
    .then(say) // Happens 4
    .then(getUserWithPromises)// Happens 5
    .then(say)// Happens 6
    .then(say)// Happens 7


