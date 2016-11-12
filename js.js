//Prepares the document
$(document).ready(function(){
	//Updates circle size
	makeCircle()
	window.onresize = makeCircle

	//Makes the "joystick" movable and constrains it to a certain area
	$("#robotDiv").draggable({
		addClasses: false,
		containment: '#joystickWrapper'
	 });

	//Moves the "joystick" back to center if clicked for 0 velocity and 0 radius
	$("#resetDiv").click(function(){
		var h = $("body").height()
		var robotTopMargin = -$("#robotDiv").height()/2
		var robotLeftMargin = -$("#robotDiv").width()/2
		$("#robotDiv").css({
			"top":"50%",
			"left":"50%",
			"margin-top": robotTopMargin,
			"margin-left": robotLeftMargin
		})
	});

	//Keeps getting the current coordinates of the robot
	setInterval(function(){
		coords = getCoords();
	},300);
});

//Function to get the "joystick" coorindinates
function getCoords(){

	//Gets the position of the corners of the corresponding div and its width/height
	var coorindinates = document.getElementById("robotDiv").getBoundingClientRect(),
		robotWidth = $("#robotDiv").width()
		robotHeight = $("#robotDiv").height()

	//Utilizes width/height and top left corner to calculate center
	var centerX = coorindinates.left-robotWidth/2
	var centerY = coorindinates.top-robotHeight/2

	//Returns the "joystick" current center location
	return [centerX, centerY]
}

//Makes the circle
function makeCircle(){
	var h = $("body").height()
	$("#robotDiv").height(h/10);
	$("#robotDiv").width(h/10);
	$("#robotDiv").css({
		"margin-top": -h/20,
		"margin-left": -h/20
	})
}
