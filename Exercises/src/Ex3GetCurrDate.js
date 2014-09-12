/**
 * Created by Dad on 16/06/2014.
 */
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if (dd<10){ dd = "0" + dd}
if (mm<10){ mm = "0" + mm}

alert("Arse " + mm + "-" + dd + "-" + yyyy + "__" + mm + "/" + dd + "/" + yyyy + "__" + dd + "-" + mm + "-" + yyyy + "__" + dd + "/" + mm + "/" + yyyy);
