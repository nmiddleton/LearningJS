/**
 * Created by u8013621 on 06/10/2014.
 */
// Based on 58of99 http://www.slideshare.net/domenicdenicola/callbacks-promises-and-coroutines-oh-my-the-evolution-of-asynchronicity-in-javascript
var q = require('q');
var time = Math.floor(Math.random() * 2) ? 0 : 1;


var BOB = {
    firstname: 'Robert',
    lastname: 'Middleton'
};


// Happens 1st right?
console.log('1');
// Happens 2nd right?
getUser(BOB, function (user) {
    console.log(user.firstname);
});
// Happens 3rd right?
console.log('3');

// No 1,3, Robert due to async (get user taking some time (even 0 time)

function getUser(name, cb) {

    console.log('t:', time); // this happens second usually
    setTimeout(
        function () {
            return cb(name);
        }, time);
}

/* Now as a promise.. */

console.log('4')
    .then(getUserwithPromise(BOB), function (user) {
        console.log('promised', user.firstname);
        return;
    })
    .then(console.log('5'));

function getUserwithPromise(name, err) {
    var deferred = q.defer();
    console.log('t:', time); // this happens second usually
    setTimeout(
        function () {
            deferred.resolve(name);
        }, time);
    return deferred.promise;
}