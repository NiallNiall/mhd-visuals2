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
		    'Color': colorTest,
		    'playing': true,
		    'beat': 0
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
		    'Color': colorTest,
		    'playing': false,
		    'beat': 0
		 });

	  	// sendName(nameTest);

	}

  	// This gets received from all
	socket.on('draw', function(data) {
	  // sendName(data.Name);
	  // sendColor(data.Color);
	  sendPlaying(data.playing);
	  sendBeat(data.beat);
	});

});



