var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var port = 3000;
http.listen(port, function() {
    console.log('Server running on port ' + port);
});

// Execute when a connection is made
io.on('connection', function(socket) {

    function blue(){
    // Initiliase a socket funcion called myFunc
    socket.emit('myFunc', {
            'ting': 'bluuuuu'
        });
    }

setInterval(function(){
    blue();
}, 1000);


});

// setInterval(function(){ console.log("Hello"); }, 1000);