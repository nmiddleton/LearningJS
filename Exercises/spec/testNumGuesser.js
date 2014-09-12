'use strict';

var chai       = require('chai'),
    expect     = chai.expect,
    sinon      = require('sinon'),
    sinonChai  = require('sinon-chai'),
    loremIpsum = require('lorem-ipsum'),

    generateRandomNumber1_10 = require('../src/generateRandomNumber1_10');


chai.use(sinonChai);


    describe.skip('rnO', function() {
        it('returns a number between 1 and 10', function() {
            expect(generateRandomNumber1_10()).to.be.above(0);
            //expect(generateRandomNumber1_10().toBeLessThan(11));
        })
    })
