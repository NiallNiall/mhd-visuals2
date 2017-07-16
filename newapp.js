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

var available = true;
var oldAvailable = true;

function sendBeat(){
   io.emit('beat', {'ting': 'egg'}); 
}


function jsMap(val, A, B, a, b) {
    var mapd = (val - A) * (b - a) / (B - A) + a
    return mapd;
}

function setAvail(availBit) {
    available = availBit;
    if (oldAvailable == available) {
        // do nothing
    } else {
        if (!available) {
            console.log("");
        } else {
            console.log("Beat Beat Beat!");
            sendBeat();
             
        }
    }
    oldAvailable = available;
}

input.on('pitch', function(msg) {
    // console.log(msg);
    if (msg.channel == 0) {
        // console.log('videoAPI:' + msg.value);
    }
    if (msg.channel == 10) {
        // console.log(msg.value);
        var thisVal = Math.floor(jsMap(msg.value, 0, 125 , 255, 0));
        io.emit('liveBeat', {'clr': thisVal});
        // console.log(thisVal);

        // if (msg.value >= 120) {
        //     setAvail(true);
        //     // socketest(socket);
        // } else {
        //     setAvail(false);
        // }
    }
});
// var cntr = 0;

// setInterval(function(){

// io.emit('myFunc', {
//     'ting': 'hey'
// });

// }, 100);



// Execute when a connection is made
io.on('connection', function(socket) {

    console.log('A New Connection! ' + socket.id)

    // input.on('pitch', function(msg) {
    //     if (msg.channel == 10) {
    //         // console.log(msg.value);
    //         socket.emit('myFunc', {
    //             'ting': msg.value
    //         });
    //     }

    // });

    // // send a message called myFunc
    // socket.emit('myFunc', {
    //     'ting': 'Connected!'
    // });

});

// setInterval(function(){ console.log("Hello"); }, 1000);