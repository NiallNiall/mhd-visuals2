function sendName(sentName){
	console.log(sentName);

	document.getElementById("texter").innerHTML = "new Words!";

}



document.addEventListener("DOMContentLoaded", function() {

  var socket = io.connect();

	// // This gets sent to all
 //  	socket.emit('draw', {
	//     'Name': 'frank'
	//  });

  	window.onmousemove = function (e) {
  		console.log('sss');

  		var nameTest = 'frank';

  		// This gets sent to all
	  	socket.emit('draw', {
		    'Name': nameTest
		 });

	  	// sendName(nameTest);

	}

  	// This gets received from all
	socket.on('draw', function(data) {
	  sendName(data.Name);
	});

});










// var wscrl = 0;

// var words = ['big', 'small', 'dog', 'cat'];

// var textCont = document.getElementById("texter");

// textCont.innerHTML = words[wscrl];

// window.setInterval(function () {
// 		textCont.innerHTML = words[wscrl];

// 		if(wscrl < 3){
// 			wscrl +=1;
// 		} else {
// 			wscrl = 0;
// 		}

//     }, 500);


// function drawLine(context, x1, y1, x2, y2) {
// 	context.moveTo(x1, y1);
// 	context.lineTo(x2, y2);
// 	context.stroke();
// }

// document.addEventListener("DOMContentLoaded", function() {
// 	var canvas = document.getElementById('canvas');
// 	var context = canvas.getContext('2d');
// 	var width = window.innerWidth;
// 	var height = window.innerHeight;

// 	canvas.width = width;
// 	canvas.height = height;

// 	var drawing = false;
// 	var x, y, prevX, prevY;

// 	var socket = io.connect();

// 	canvas.onmousedown = function(e) {
// 		drawing = true;
// 		prevX = x;
// 		prevY = y;
// 	}

// 	canvas.onmouseup = function(e) {
// 		drawing = false;
// 	}

// 	canvas.onmousemove = function(e) {
// 		x = e.clientX;
// 		y = e.clientY;
// 		if (drawing) {
// 			socket.emit('draw', {
// 				'x1': prevX,
// 				'y1': prevY,
// 				'x2': x,
// 				'y2': y
// 			});

// 			drawLine(context, prevX, prevY, x, y);
// 			prevX = x;
// 			prevY = y;
// 		}
// 	}


// document.addEventListener("DOMContentLoaded", function() {

// 	socket.on('draw', function(data) {
		
// 	});
// });
