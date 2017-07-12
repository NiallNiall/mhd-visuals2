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
var playing = false;
var beatVar = 0;

// Execute when a connection is made
io.on('connection', function(socket) {

    // Execute when draw is called from frontend
    // Initialise a function called draw?
    socket.on('draw', function(data) {
        socket.broadcast.emit('draw', data);
        socket.emit('draw', data);
    });


    input.on('pitch', function(msg) {

    	// if(msg.channel !== 0){
	    //     console.log(msg);
	    // }

        if (msg.channel == 5) {
            startNum = msg.value;
        }

        if (msg.channel == 6) {
            if(msg.value > 1){
            	playing = true;
            } else {
            	playing = false
            }
        }

        if (msg.channel == 10) {
            if(msg.value > 120) {
	            console.log('BOOM!');
            }
            beatVar = msg.value;
        }
        // console.log(msg);
        // do something with msg

        socket.emit('draw', {
            'Name': startNum,
            'Color': '#088',
            'playing': playing,
            'beat': beatVar
        });
    });


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