/**
 * Created by U8013621 on 13/12/2014.
 */
// A Factory pattern is a way for an object to create other objects
// Basically a subroutine returning a "new" object.
// An abstraction of a prototype object
//
// Constructor (prototype object) is concrete, in that it creates all the things of a class for each cloned Class.
function Car (wheels){
    this.wheelcount = wheels || 4;
}
// a factory is abstract because it creates object by

Car.fact