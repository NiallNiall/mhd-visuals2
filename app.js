var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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


	setInterval( function(){
		console.log(startNum);
		socket.emit('draw', {
			    'Name': startNum,
			    'Color': '#088'
			 });
			}, 1000);

});


setInterval( function(){
		startNum +=1;		
	}, 1000);



// io.on('connection', function(socket){
//   console.log('A user connected');

//   //Send a message after a timeout of 4seconds
//   setTimeout(function(){
// 		console.log('yoyo')
// 	}, 4000);
//   socket.on('disconnect', function () {
//     console.log('A user disconnected');
//   });
// });




// io.on('connection', function (socket) {
// 	socket.on('draw', function (data) {
// 		socket.broadcast.emit('draw', data);
// 	});
// });


// var wscrl = 0;

// setInterval(function () {
// 	// console.log('boo');
// 	if(wscrl < 3){
// 		wscrl +=1;
// 	} else {
// 		wscrl = 0;
// 	}
// 	console.log(wscrl);

// 	io.sockets.emit('users_count', clients);

// }, 1000);

