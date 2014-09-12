/**
 * Created by U8013621 on 17/06/2014.
 */

var triangle_side_1 = 5;
    triangle_side_2 = 6;
    triangle_side_3 = 7;
    triangle_perim = triangle_side_1 + triangle_side_2 + triangle_side_3;
    perim_2 = triangle_perim / 2;

area = Math.sqrt( perim_2 * (perim_2 - triangle_side_1)*(perim_2 - triangle_side_2)*(perim_2 - triangle_side_3));
console.log(area);

