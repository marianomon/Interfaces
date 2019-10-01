"use strict";
let time=0, hours=0, minutes=0, seconds=0, degreeHours=0,
degreeMinutes=0, degreeSeconds=0,timer;

timer = setInterval(clock,1000);
function clock(){
	time = new Date();

	hours = time.getHours();
	minutes = time.getMinutes();
	seconds = time.getSeconds();
	hours %=12;
	degreeHours = hours*30;
	degreeMinutes = minutes*6;
	degreeSeconds = seconds*6;
	degreeHours = degreeHours+0.5*minutes;

	document.getElementsByClassName("hora")[0].style.transform = "rotateZ("+degreeHours+"deg)";
	document.getElementsByClassName("minutero")[0].style.transform = "rotateZ("+degreeMinutes+"deg)";
	document.getElementsByClassName("segundero")[0].style.transform = "rotateZ("+degreeSeconds+"deg)";
}
