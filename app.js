var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Load the Easy midi Stuff
var easymidi = require('easymidi');
var inputs = easymidi.getInputs();
console.log(inputs);
var input = new easymidi.Input(inputs[2]);

app.use(express.static(__dirname + '/public'));

var port = 3000;
http.listen(port, function() {
	    console.log('Server running on port ' + port);
});

var startNum = 0;

// Execute when a connection is made
io.on('connection', function (socket) {

	// Execute when draw is called from frontend
	// Initialise a function called draw?
	socket.on('draw', function (data) {
		socket.broadcast.emit('draw', data);
		socket.emit('draw', data);
	});


input.on('pitch', function (msg) {
	startNum = msg.value;
	console.log(msg);
  // do something with msg

  socket.emit('draw', {
			    'Name': startNum,
			    'Color': '#088'
			 });
});

	// setInterval( function(){
	// 	console.log(startNum);
	// 	socket.emit('draw', {
	// 		    'Name': startNum,
	// 		    'Color': '#088'
	// 		 });
	// 		}, 1000);

});


// setInterval( function(){
// 		startNum +=1;		
// 	}, 1000);








// // var JZZ = require('jzz');
// var Jazz = require('jazz-midi');

// var info=Jazz.MidiInInfo(0);
// if(info.length>=3){
//   console.log("Name: "+info[0]+"\nManufacturer: "+info[1]+"\nVersion: "+info[2]);
// }
