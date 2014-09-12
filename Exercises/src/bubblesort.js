/**
 * Created by u8013621 on 01/09/2014.
 */

numbers = [ 34, 56 , 4545, 2, 45, 213, 34, 2, 7, 45 ];
var swapping = true;
console.log(numbers);
while (swapping){
    swapping = false;
    for (var i = 0; i < (numbers.length - 1); i++) {
        if (numbers[i] > numbers[i + 1]) {
            console.log("swapping " + i+"<>"+ (i+1) + "num: " + numbers[i] + "==" + numbers[i+1]);
            var temp = numbers[i];
            numbers[i] = numbers[i + 1];
            numbers[i + 1] = temp;
            swapping = true;
        }
    }
}
console.log(numbers);