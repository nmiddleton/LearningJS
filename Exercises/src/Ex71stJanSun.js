/**
 * Created by U8013621 on 17/06/2014.
 */

for (var year = 2014; year <=2050; year++) {
    var Jan1 = new Date("January 1, " + year + " 01:00:00");
    if (Jan1.getDay() === 0) console.log(Jan1 +" is a Sunday");
}