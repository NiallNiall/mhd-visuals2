var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Load the Easy midi Stuff
var easymidi = require('easymidi');
// Make a new Port and name it
var input = new easymidi.Input('Phonode Midi', true);


app.use(express.static(__dirname + '/public'));

var port = 3000;
http.listen(port, function() {
    console.log('Server running on port ' + port);
});

available = true;
oldAvailable = true;





function setAvail(thisSocket, availBit) {
    available = availBit;
    if (oldAvailable == available) {
        // do nothing
    } else {
        if (!available) {
            console.log("");
            // triggerEvent();
        } else {
            console.log("Beat Beat Beat!");
            // triggerOn();
            	thisSocket.emit('beat', {
					'ting': 'egg'
				});
        }
    }
    oldAvailable = available;
}


function socketest(thisSocket){
	thisSocket.emit('myFunc', {
		'ting': 'Beat'
	});
}




// Execute when a connection is made
io.on('connection', function(socket) {



    input.on('pitch', function(msg) {
        // console.log(msg);
        if (msg.channel == 0) {
            // console.log('videoAPI:' + msg.value);
        }
        if (msg.channel == 10) {
            // console.log(msg.value);

            if (msg.value >= 120) {
                setAvail(socket, true);
                // socketest(socket);
            } else {
                setAvail(socket, false);
            }
        }
    });



    // send a message called myFunc
    socket.emit('myFunc', {
        'ting': 'Connected!'
    });

});

// setInterval(function(){ console.log("Hello"); }, 1000);