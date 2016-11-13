//Prepares the document
// Zain and Justin Updated 
$(document).ready(function(){

	//Creatas gridlines
	//y axis
	var gr = new jsGraphics(document.getElementById("canvas"));
	var col = new jsColor("black");
	var pen = new jsPen(col,1);
	var yaxis1 = new jsPoint($('#canvas').width()/2,document.getElementById("canvas").getBoundingClientRect().top);
	var yaxis2 = new jsPoint($('#canvas').width()/2,document.getElementById("canvas").getBoundingClientRect().bottom);
	gr.drawLine(pen,yaxis1,yaxis2);

	//x axis
	var gr = new jsGraphics(document.getElementById("canvas"));
	var col = new jsColor("black");
	var pen = new jsPen(col,1);
	var xaxis1 = new jsPoint(0,$('#canvas').height()/2);
	var xaxis2 = new jsPoint($('#canvas').width(),$('#canvas').height()/2);
	gr.drawLine(pen,xaxis1,xaxis2);

	//Updates circle size
	makeCircle()
	window.onresize = makeCircle

	//Gets starting position
	originalPos = getCoords();

	//Makes the "joystick" movable and constrains it to a certain area
	$("#robotDiv").draggable({
		addClasses: false,
		containment: '#robotDivWrapper'
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


	//Sensor Readings
		roombaReadings = {
			distance:"0",
			angle:"0",
			cliffSensorLeft:"false",
			cliffSensorFrontLeft:"false",
			cliffSensorFrontRight:"false",
			cliffSensorRight:"false",
			wallSensor:"false",
			leftWheelVelocity:"0",
			rightWheelVelocity:"0",
			leftEncoderCount:"0",
			rightEncoderCount:"0",
			lightBumpRight:"0",
			lightBumpFrontRight:"0",
			lightBumpCenterRight:"0",
			lightBumpCenterLeft:"0",
			lightBumpFrontLeft:"0",
			lightBumpLeft:"0",
			lightBumper:"0"
		}

		oldAngle = 0

	//Updating information in real time
	coords = []
	setInterval(function(){


		
		
		$('#distanceSensor').text("Distance: " + roombaReadings.distance + "mm")
		$('#angleSensor').text("Angle: " + roombaReadings.angle)
		$('#cliffSensorLeft').text("Cliff Left: " + roombaReadings.cliffSensorLeft)
		$('#cliffSensorFrontLeft').text("Cliff Front Left: " + roombaReadings.cliffSensorFrontLeft)
		$('#cliffSensorFrontRight').text("Cliff Front Left: " + roombaReadings.cliffSensorFrontRight)
		$('#cliffSensorRight').text("Cliff Right: " + roombaReadings.cliffSensorRight)
		$('#wallSensor').text("Wall Signal: " + roombaReadings.wallSensor)
		$('#leftWheelVelocity').text("Left Wheel Velocity: " + roombaReadings.leftWheelVelocity + "mm/s")
		$('#rightWheelVelocity').text("Right Wheel Velocity: " + roombaReadings.rightWheelVelocity + "mm/s")
		$('#leftEncoderCount').text("Left Encoder Count: " + roombaReadings.leftEncoderCount)
		$('#rightEncoderCount').text("Right Encoder Count: " + roombaReadings.rightEncoderCount)
		$('#lightBumpRight').text("Light Bumper Sensor Right: " + roombaReadings.lightBumpRight)
		$('#lightBumpFrontRight').text("Light Bumper Sensor Front Right: " + roombaReadings.lightBumpFrontRight)
		$('#lightBumpCenterRight').text("Light Bumper Sensor Center Right: " + roombaReadings.lightBumpCenterRight)
		$('#lightBumpCenterLeft').text("Light Bumper Sensor Center Left: " + roombaReadings.lightBumpCenterLeft)
		$('#lightBumpFrontLeft').text("Light Bumper Sensor Front Left: " + roombaReadings.lightBumpFrontLeft)
		$('#lightBumpLeft').text("Light Bumper Sensor Left: " + roombaReadings.lightBumpLeft)

		//Coordinates of "joystick"
		coords = getCoords();
		//console.log(coords);

		//Getting current velocity and radius
		// Radius is x value and it is the ratio of the two wheel speeds
		var velocity = Math.floor(500*(originalPos[1]-coords[1])/($("#robotDivWrapper").height()/2));
		var radius= Math.floor(100*(-originalPos[0] + coords[0])/($("#robotDivWrapper").width()/2));


		// creating url for ajax depending on type of movement
		var target_url;

		if (radius == 0 && velocity != 0) {
			target_url = '/forward/'+velocity.toString();
		} else if (radius != 0 && velocity == 0) {
			target_url = '/spin/'+radius.toString();
		} else if (radius == 0 && velocity == 0) {
			target_url = '/stop';
		} else if (radius != 0 && velocity != 0) {
			target_url = '/turn/'+velocity.toString()+'/'+radius.toString();
		}

		$.ajax({
			url: target_url,
			type: "get",
			success: function(response){
				//console.log(response)
			},
			error: function(){
				console.log("error")
			}
		});

		// creating ajax for roomba data 
		var json = $.ajax({
           	url: "/getSensorData",
            dataType: "data",
            async: false,
        }).responseText;
        obj = JSON.parse(json);
        console.log(json);

        roombaReadings.distance = obj.distance;
		roombaReadings.angle = obj.angle;
		roombaReadings.cliffSensorLeft = obj.cliffSensorLeft;
		roombaReadings.cliffSensorFrontLeft = obj.cliffSensorFrontLeft;
		roombaReadings.cliffSensorFrontRight = obj.cliffSensorFrontRight;
		roombaReadings.cliffSensorRight = obj.cliffSensorRight;
		roombaReadings.wallSensor = obj.wallSensor;
		roombaReadings.leftWheelVelocity = obj.leftWheelVelocity;
		roombaReadings.rightWheelVelocity = obj.rightWheelVelocity;
		roombaReadings.leftEncoderCount = obj.leftEncoderCount;
		roombaReadings.rightEncoderCount = obj.rightEncoderCount;
		roombaReadings.lightBumpRight = obj.lightBumpRight;
		roombaReadings.lightBumpFrontRight = obj.lightBumpFrontRight;
		roombaReadings.lightBumpCenterRight = obj.lightBumpCenterRight;
		roombaReadings.lightBumpCenterLeft = obj.lightBumpCenterLeft;
		roombaReadings.lightBumpFrontLeft = obj.lightFrontLeft;
		roombaReadings.lightBumpLeft = obj.lightBumpLeft;

		/*if (roombaReadings.distance != 0 && roombaReadings.distance != undefined) {
			alert("Distance is " + roombaReadings.distance)
		}*/

		//console.log(velocity,radius)

		// //Updating velocity and radius on display
		 $("#velocityP").text(velocity + " mm/s")
		 $("#radiusP").text(radius + " mm")

		//Creating map
		//visualize(velocity)

		//Creating map
		/*oldAngle += roombaReadings.angle
		if (oldAngle >= 360){
			oldAngle = oldAngle % 360
		}
		else if (oldAngle<0){
			oldAngle = 360 - oldAngle
		}
		origin = [
		$('#canvas').width()/2,
		$('#canvas').height()/2
		];
		radius = roombaReadings.distance;
		oldTheta = oldAngle;
		newTheta = roombaReadings.angle;
		visualize(origin[0],origin[1],radius,oldTheta,newTheta)
		newxy = calculatexy(radius,oldTheta,newTheta);
		origin = [originalX+newXY[0],originalY+newXY[1]]*/
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

//Makes the map
function visualize(originalX,originalY,radius,originalTheta,newTheta){
	var gr = new jsGraphics(document.getElementById("canvas"));
	var col = new jsColor("red");
	var pen = new jsPen(col,1);
	newXY = calculatexy(radius,originalTheta,newTheta);
	var pt1 = new jsPoint(originalX,originalY);
	var pt2 = new jsPoint(originalX+newXY[0],originalY+newXY[1]);
	gr.drawLine(pen,pt1,pt2);
}

//Calcualtes the next (x,y) value
function calculatexy(radius,originalTheta,newTheta){
	xValue = (((2*radius^2)-4*radius*abs(Math.cos(newTheta-originalTheta)))^(1/2))*Math.cos(originalTheta-(newTheta-originalTheta)/2);
	yValue = (((2*radius^2)-4*radius*abs(Math.cos(newTheta-originalTheta)))^(1/2))*Math.sin(originalTheta-(newTheta-originalTheta)/2);
	return [xValue,yValue]
}