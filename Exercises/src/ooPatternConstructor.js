/**
 * Created by U8013621 on 09/12/2014.
 */
"use strict";

// Private area
var carsInFashion = true; // Class variable, private  but setting the value for ALL Car instances (though it cannot be seen at Beetle.carsInfashion => undefined

// Public area
// Constructor defines the type
function Car(name, color) {
    this.name = name;               // instance variable - Public
    this.color = color;             // instance variable - Public
}

// Methods define the behaviour
Car.prototype.isStarted = false;               // instance variable - Private because specific to this instance, it is not an argument, nor returned
Car.prototype.inFashion = carsInFashion;       // instance variable - referencing private variable that is GLOBAL on the module.
Car.prototype.start = function () {            // method #1 changes a private instance variable
    console.log(this.color, this.name, 'was started');
    this.isStarted = true;
};
Car.prototype.fashionToggle = function () {
    carsInFashion = !carsInFashion;            // toggle the private variable that is GLOBAL on this module
};
Car.prototype.refreshFashion = function () {
    this.inFashion = carsInFashion;            // refresh the instance property to the global provate variable
};


module.exports = Car;
