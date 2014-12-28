/**
 * Created by U8013621 on 09/12/2014.
 */
"use strict";

// Private area
var carsInFashion = true; // Class variable, private but setting the value for ALL Car instances
                          // (though it cannot be seen at Beetle.carsInfashion => undefined
                          // this is the equivalent

// Public area
// Constructor defines the type
function Car(name, color) {
    this.name = name;               // instance variable - Public
    this.color = color;             // instance variable - Public
}

// Prototype Properties must be primitives (or they will change for all isntances) But better to put them in the contructor
Car.prototype.isStarted = false;               // instance variable - Private because specific to this instance, not global because boolean is a primitive
Car.prototype.inFashion = carsInFashion;       // instance variable - referencing private variable that is GLOBAL on the module.

// Methods define the behaviour
Car.prototype.start = function () {            // method #1 changes a private instance variable
    console.log(this.color, this.name, 'was started');
    this.isStarted = true;
};
Car.prototype.fashionToggle = function () {
    carsInFashion = !carsInFashion;            // toggle the private variable that is GLOBAL on this module
};
Car.prototype.refreshCar = function () {
    this.inFashion = carsInFashion;            // refresh the instance property to the global private variable
    this.isStarted = carsInFashion;            // refresh the instance property to the global private variable
};
Car.prototype.showData = function () {
    console.log('Type:', this.name);
    console.log('Coolness:', this.inFashion);
    console.log('Started:', this.isStarted);
    console.log('Gears:', this.gears);
};

// This next is a bad prototype property - becomes a global property like carsInFashion as it is not a primitive type
Car.prototype.gears = [1,2,3];


module.exports = Car;
