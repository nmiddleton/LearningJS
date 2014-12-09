/**
 * Created by U8013621 on 09/12/2014.
 */
'use strict';
var chai       = require('chai'),
    expect     = chai.expect,
    sinon      = require('sinon'),
    sinonChai  = require('sinon-chai'),

    Car = require('../src/ooPatternConstructor');


chai.use(sinonChai);


describe('A car constructor', function() {
    it('creates a Car of any color', function (){
        var beetle = new Car('Beetle','blue');
        expect(beetle.color).to.equal('blue');
    });
    it('is not started by default', function(){
        var golf = new Car('Golf','blue');
        expect(golf.isStarted).to.equal(false);
    });
    it('can be started', function(){
        var golf = new Car('Golf','silver');
        golf.start();
        expect(golf.isStarted).to.equal(true);
    });
    it('one car changing private module variable can send all cars out of fashion!', function(){
        var escort = new Car('Escort','green');
        var mini = new Car('Mini','black');
        // Minis are cool
        expect(mini.inFashion).to.equal(true);

        //Minis suck
        mini.fashionToggle();       //change fashion ONLY for the mini?
        mini.refreshFashion();      //refresh fashion of mini
        escort.refreshFashion();    //refresh fashion of escort, why not, maybe it is still cool

        expect(mini.inFashion).to.equal(false);
        expect(escort.inFashion).to.equal(false); //Mini sucking sent escort out of fashion too

        // Escort can make mini cool again then?!
        escort.fashionToggle();     //change fashion ONLY for the escort?
        escort.refreshFashion();    //refresh fashion of escort, why not, maybe it is now cool
        mini.refreshFashion();      //refresh fashion of mini
        expect(escort.inFashion).to.equal(true); //Escort is cool
        expect(mini.inFashion).to.equal(true);   //Now mini (in fact all cars) are now cool

    });

})