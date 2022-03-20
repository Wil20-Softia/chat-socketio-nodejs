const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

//ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//SECTION CONFIG IO
io.on('connection', (socket) => {
    console.log("a user connected");

    //EVENT EJECT WHEN DISCONNECTED CLIENT
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });

    //EVENT RECEIVED OF CLIENT
    socket.on('chat message', (msg)=>{
        io.emit('chat message', msg); //EMIT MSG FOR ALL SOCKETS CONNECTED, WHEN RECEIVE THE EVENT chat message
    });
});

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//SERVER LISTENING
http.listen(3000, ()=>{
    console.log('listening on port :3000');
});