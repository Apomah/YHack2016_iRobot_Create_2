$(document).ready(function(){
	 $("#robotDiv").draggable({
		addClasses: false,
		containment: [200, 200, 600, 400],
		//handle: "div",
	 });
	$("#resetDiv").click(function(){
		$("#robotDiv").css({
			"top":"50%",
			"left":"50%",
			"margin-top":"-5em",
			"margin-left":"-5em"
		})
	});
	//while (true){
	setInterval(function(){
		coords = getCoords();
	},300);
});
function getCoords(){
	var coorindinates = document.getElementById("robotDiv").getBoundingClientRect(),
		robotWidth = $("#robotDiv").width()
		robotHeight = $("#robotDiv").height()
	var centerX = coorindinates.left-robotWidth/2
	var centerY = coorindinates.top-robotHeight/2
	return [centerX, centerY]
}