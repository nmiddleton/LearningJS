/**
 * Created by u8013621 on 10/12/2014.
 */

var Car = require('../src/ooPatternConstructor');
var golf = new Car('Golf','silver');
golf.start();
golf.gears.push(4);
var lada = new Car('Lada','grey');
golf.showData();
lada.showData();
