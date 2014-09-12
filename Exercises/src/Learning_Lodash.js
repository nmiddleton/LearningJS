/**
 * Created by Dad on 07/09/2014.
 */
var _ = require("lodash");

var cards = [
    { rank: "A", suit: "Clubs"},
    { rank: "K", suit: "Clubs"},
    { rank: "Q", suit: "Clubs"},
    { rank: "J", suit: "Clubs"},
    { rank: "10", suit: "Clubs"},
    { rank: "9", suit: "Clubs"},
    { rank: "8", suit: "Clubs"},
    { rank: "7", suit: "Clubs"},
    { rank: "6", suit: "Clubs"},
    { rank: "5", suit: "Clubs"},
    { rank: "4", suit: "Clubs"},
    { rank: "3", suit: "Clubs"},
    { rank: "2", suit: "Clubs"},
    { rank: "A", suit: "Spades"},
    { rank: "K", suit: "Spades"},
    { rank: "Q", suit: "Spades"},
    { rank: "J", suit: "Spades"},
    { rank: "10", suit: "Spades"},
    { rank: "9", suit: "Spades"},
    { rank: "8", suit: "Spades"},
    { rank: "7", suit: "Spades"},
    { rank: "6", suit: "Spades"},
    { rank: "5", suit: "Spades"},
    { rank: "4", suit: "Spades"},
    { rank: "3", suit: "Spades"},
    { rank: "2", suit: "Spades"},
    { rank: "A", suit: "Hearts"},
    { rank: "K", suit: "Hearts"},
    { rank: "Q", suit: "Hearts"},
    { rank: "J", suit: "Hearts"},
    { rank: "10", suit: "Hearts"},
    { rank: "9", suit: "Hearts"},
    { rank: "8", suit: "Hearts"},
    { rank: "7", suit: "Hearts"},
    { rank: "6", suit: "Hearts"},
    { rank: "5", suit: "Hearts"},
    { rank: "4", suit: "Hearts"},
    { rank: "3", suit: "Hearts"},
    { rank: "2", suit: "Hearts"},
    { rank: "A", suit: "Diamonds"},
    { rank: "K", suit: "Diamonds"},
    { rank: "Q", suit: "Diamonds"},
    { rank: "J", suit: "Diamonds"},
    { rank: "10", suit: "Diamonds"},
    { rank: "9", suit: "Diamonds"},
    { rank: "8", suit: "Diamonds"},
    { rank: "7", suit: "Diamonds"},
    { rank: "6", suit: "Diamonds"},
    { rank: "5", suit: "Diamonds"},
    { rank: "4", suit: "Diamonds"},
    { rank: "3", suit: "Diamonds"},
    { rank: "2", suit: "Diamonds"}
];

var clubs = _.shuffle(_.filter(cards, function (card) {
    return card.suit === "Clubs";
}));
//console.log( JSON.stringify ( clubs, null, 1 ));

//EACH
//=================================
// _.each(list, iterator, [context]) Looks through each value in the list, returning an array of truthy values (where ITERATOR contains an function you want to perform on the list item).
//an each loop cannot be broken out of... use _find
//e.g. console log the face value and the suit
console.log("EACH: ")
_.each(clubs,
    function (card) {
        console.log("Card:" + card.rank + "-" + card.suit)
    },
    []);

// FIND
// _.find(list, iterator, [context]) Looks through each value in the list, returning the first truthy value it comes to (where ITERATOR contains the "test" of truth).
//e/g/ find the first King
console.log("FIND: ")
var firstKing = _.find(cards,
    function (card) {
        return card.rank === 'K';
    },
    []);
console.log("FOUND:" + firstKing.rank + firstKing.suit);

//FILTER (aka SELECT)
//=================================
// _.filter(list, iterator, [context]) Looks through each value in the list, returning an array of truthy values (where ITERATOR contains the "test" of truth).
//e/g/ filter ON the 2's
var twos = _.filter(cards,
    function (card) {
        return card.rank === '2';
    },
    []);
console.log("FILTER:" + JSON.stringify(twos, null, 1));
//REJECT
//=================================
// _.reject(list, iterator, [context]) Looks through each value in the list, returning an array of falsy values (where ITERATOR contains the "test" of truth).
//e/g/ filter all but the 2's
var notTwos = _.reject(cards,
    function (card) {
        return card.rank === '2';
    },
    []);
_.each(notTwos, function (card) {
    console.log("REJECTED: " + card.rank + card.suit);
});

// MAP
//=================================
// _.map( list, iterator,[context]) Creates new array of values by mapping each value in the list to new values (where ITERATOR contains the tranforming code)
var elevens = _.map(twos,
    function (card) {
        card.rank = "11";
        return card;
    },
    []);
console.log("MAP: " + JSON.stringify(elevens, null, 1));

//SORTBY
//=================================
// _.sortBy( list, iterator,[context]) returns a sorted copy of a list by running each value through the ITERATOR <- the name of the property to sort by
var sortedSuits = _.sortBy(elevens, function (card) { // the suits are not alpha sorted
    return card.suit;
});
var sortedShuffle = _.sortBy(clubs, function (card) { //the earlier shuffled suit
    return card.rank;
});
console.log(JSON.stringify(sortedShuffle, null, 1));

// REDUCE  (aka inject or foldL)
//=================================
// _.reduce(list, iterator, [memo], [context])
// boils the array down to a single value. iterator contains the function performing the operation on the current ListItem and the "memo".
// Where MEMO is the initial value of the reduce (you can start it at say 100 if you like). The value of the reduce is held each time in memo, so the fucntion must return it
// Basically memo is the magic that keeps track of the last running total.

var adder = _.reduce([1, 2, 3, 4, 5], function (memo, ListItem) {
        var nextVal = memo + ListItem;
        console.log("REDUCE... Currval[" + ListItem + "] + RunningTotal[" + memo + "] = nextVal[" + nextVal + "]");
        return nextVal;
    },
    100, //initial memo
    []); //context
console.log("REDUCED to " + adder);

// REDUCERIGHT  (aka inject or foldR)
//=================================
// _.reduceRight(list, iterator, [memo], [context])
// same as reduce but iterates the list from the end to the start.
var adderRIGHT = _.reduceRight([1, 2, 3, 4, 5], function (memo, ListItem) {
        var nextVal = memo + ListItem;
        console.log("REDUCERIGHT... Currval[" + ListItem + "] + RunningTotal[" + memo + "] = nextVal[" + nextVal + "]");
        return nextVal;
    },
    100, //initial memo
    []); //context
console.log("REDUCEDRIGHT to " + adderRIGHT);


//EVERY
//_.every( list, [test], [context])
// returns true if ALL the values in an array are tested and are truthy
if (_.every(cards, function (card) {
    console.log("EVERY: " + card.rank + card.suit); // prove it is iterating
    return card.hasOwnProperty("suit"); // the test for truthy
}, [])) {
    console.log("Every card has the suit property");
}
;

// SOME
//_.some( list, [test], [context])
// returns true if ANY the values in an array are tested and are truthy
var anyHearts = _.some(cards, function (card) {
    return card.suit === "Hearts";
}, []);
if (anyHearts) {
    console.log("SOME:  Hearts were found");
}


//PLUCK
//_.pluck(list,property)
// easy way for picking the list of property VALUES (not the keys, not as pairs)).
var suits = _.pluck(cards, 'suit');
//var sortedSpades =_.sortBy(spades, function(card){return card.rank},[]);
_.each(suits, function (card) {
    console.log("PLUCK: " + card);
});

// MAX MIN
//_.max(list, [iteratee], [context])
//_.min(list, [iteratee], [context])
var numbers = [10, 34, 642, 2,543, 8];
console.log("MAX: " + _.max(numbers, function(num){return num.toString().charAt(0)} ));
console.log("MIN: " + _.min(numbers));
