var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Start the server
app.use(express.static(__dirname + '/public'));

var port = 3000;
http.listen(port, function() {
    console.log('Server running on port ' + port);
});

var txtNum = 0;
var txt = ['prune'];

setInterval(function(){
    if(txtNum < txt.length-1){
        txtNum += 1;
    } else {
        txtNum = 0;
    }

    io.emit('myFunc', {'txt': txt[txtNum]});
}, 1000);


// Execute when a connection is made
io.on('connection', function(socket) {
    console.log('A New Connection! ' + socket.id)


    socket.on('fromCli', function(data) {
        console.log(data);
        txt.push(data);
    });

});