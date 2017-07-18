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

var txtNum = 0;
var txt = ['prune', 'jam'];

// Set Availability Boolean
var available = true;
// Create a copy to store previous state
var oldAvailable = available;

var thisNum = 0;

function moveText(){
     if(txtNum < txt.length-1){
        txtNum += 1;
    } else {
        txtNum = 0;
    }

    io.emit('myFunc', {'txt': txt[txtNum]});
}


function setAvail(availBit) {
     available = availBit;
     if (oldAvailable == available) {
         // do nothing
     } else {
         if (!available) {
             console.log("");
             // triggerEvent();
         } else {
             console.log("Beat Beat Beat!");
             // txtNum+=1;
             moveText();
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
        // moveText();
        if(msg.value > 120){
            setAvail(true);
        } else {
            setAvail(false);
        }
    }
});




// Execute when a connection is made
io.on('connection', function(socket) {
    console.log('A New Connection! ' + socket.id)


    socket.on('fromCli', function(data) {
        console.log(data);
        txt.push(data);
    });

});