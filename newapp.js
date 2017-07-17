var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Load the Easy midi Stuff
var easymidi = require('easymidi');
// Make a new Port and name it
var input = new easymidi.Input('Phonode Midi', true);


//Start the server
app.use(express.static(__dirname + '/public'));

var port = 3000;
http.listen(port, function() {
    console.log('Server running on port ' + port);
});

// Initiliase a function to make maps
function jsMap(val, A, B, a, b) {
    var mapd = (val - A) * (b - a) / (B - A) + a
    return mapd;
}

function jsClamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}


input.on('pitch', function(msg) {
    // console.log(msg);
    if (msg.channel == 0) {
        // console.log('videoAPI:' + msg.value);
    }
    if (msg.channel == 10) {
        // console.log(msg.value);
        var reVal = 0;
        var valInst = msg.value;
        // Weird mapping to resync the beat phase
        if(valInst < 64) {reVal = 64 + valInst;} else {reVal = -64 + valInst;}

        var thisVal = jsClamp(Math.floor(jsMap(reVal, 0, 50 , 255, 0)), 0, 255);
        io.emit('liveBeat', {'clr': thisVal});
        // console.log(valInst + ' / ' + reVal + ' / ' + thisVal);
    }
});

// Execute when a connection is made
io.on('connection', function(socket) {
    console.log('A New Connection! ' + socket.id)
});

// setInterval(function(){ console.log("Hello"); }, 1000);