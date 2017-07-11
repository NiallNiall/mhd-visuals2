function sendName(sentName){
	console.log(sentName);
	document.getElementById("texter").innerHTML = sentName;//"Paragraph changed!";
}

function sendColor(sentColor){
	document.getElementById("mainbox").style.background = sentColor;//"Paragraph changed!";
}



document.addEventListener("DOMContentLoaded", function() {

  var socket = io.connect();

	// // This gets sent to all
 //  	socket.emit('draw', {
	//     'Name': 'frank'
	//  });

  	window.onmousedown = function (e) {
  		// console.log('sss');

  		var nameTest = 'frank';
  		var colorTest = '#fff';
  		// This gets sent to all
	  	socket.emit('draw', {
		    'Name': nameTest,
		    'Color': colorTest
		 });

	  	// sendName(nameTest);

	}

	 window.onmouseup = function (e) {
  		// console.log('sss');

  		var nameTest = 'dave';
  		var colorTest = '#000';
  		// This gets sent to all
	  	socket.emit('draw', {
		    'Name': nameTest,
		    'Color': colorTest
		 });

	  	// sendName(nameTest);

	}

  	// This gets received from all
	socket.on('draw', function(data) {
	  sendName(data.Name);
	  sendColor(data.Color);
	});

});



