function sendName(sentName){
	// console.log(sentName);
	document.getElementById("texter").innerHTML = sentName;//"Paragraph changed!";
}

function sendColor(sentColor){
	document.getElementById("mainbox").style.background = sentColor;//"Paragraph changed!";
}

function sendPlaying(sentPlay){
	var playingText = 'play';
	if(sentPlay){playingText = 'play'} else {playingText = 'pause'}
	document.getElementById("startstop").innerHTML = playingText;//"Paragraph changed!";
}

function sendBeat(sentBeat){
	console.log(sentBeat);
	document.getElementById("mainbox").style.background = 'rgba(' + sentBeat + ', ' + sentBeat + ', ' + sentBeat + ',1.0)';//"Paragraph changed!";
}


// =====================================================
// Canvas drawing bits
// =====================================================

function jsMap(val, A, B, a, b) {
    var mapd = (val - A) * (b - a) / (B - A) + a
    return mapd;
}

var myCanvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY){
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

function drawAmt(inp, prgrss){
	// var inp = 64;
	var arcAmt = jsMap(inp, 0, 127, 0, Math.PI*2);

	var arcAmt2 = jsMap(prgrss, 0, 12400, 0, Math.PI*2);


	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPieSlice(ctx, 150,150,100, 0, arcAmt, '#fff');

	ctx.beginPath();
	ctx.arc(150, 150, 90, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.fill();

    drawPieSlice(ctx, 150,150,80, 0, arcAmt2, '#fff');

    ctx.beginPath();
	ctx.arc(150, 150, 70, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.fill();

}


// =====================================================
// Canvas drawing bits
// =====================================================


document.addEventListener("DOMContentLoaded", function() {

  var socket = io.connect();

	// // This gets sent to all
 //  	socket.emit('draw', {
	//     'Name': 'frank'
	//  });

 //  	window.onmousedown = function (e) {
 //  		// console.log('sss');

 //  		var nameTest = 'frank';
 //  		var colorTest = '#fff';
 //  		// This gets sent to all
	//   	socket.emit('draw', {
	// 	    'Name': nameTest,
	// 	    'Color': colorTest,
	// 	    'playing': true,
	// 	    'beat': 0
	// 	 });

	//   	// sendName(nameTest);

	// }

	//  window.onmouseup = function (e) {
 //  		// console.log('sss');

 //  		var nameTest = 'dave';
 //  		var colorTest = '#000';
 //  		// This gets sent to all
	//   	socket.emit('draw', {
	// 	    'Name': nameTest,
	// 	    'Color': colorTest,
	// 	    'playing': false,
	// 	    'beat': 0
	// 	 });

	//   	// sendName(nameTest);

	// }

  	// This gets received from all
	socket.on('draw', function(data) {
	  // sendName(data.Name);
	  // sendColor(data.Color);
	  sendPlaying(data.playing);
	  sendBeat(data.beat);

	  drawAmt(data.beat, data.progress);
	});

});



