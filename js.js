//Prepares the document
$(document).ready(function(){

	//Makes the "joystick" movable and constrains it to a certain area
	$("#robotDiv").draggable({
		addClasses: false,
		containment: [200, 200, 600, 400]
	 });

	//Moves the "joystick" back to center if clicked for 0 velocity and 0 radius
	$("#resetDiv").click(function(){
		$("#robotDiv").css({
			"top":"50%",
			"left":"50%",
			"margin-top":"-5em",
			"margin-left":"-5em"
		})
	});

	//Keeps getting the current coordinates of the robot
	setInterval(function(){
		coords = getCoords();
	},300);
});

//Function to get the "joystick" coordinates
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
