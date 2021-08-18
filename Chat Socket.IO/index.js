const express = require('express');
const path = require('path');

// inicializacion 
const app = express();

app.set('port', process.eventNames.PORT || 3000);

app.use(express.static(path.join(__dirname,'public')));

// servidor correindo
const server = app.listen(app.get('port'), ()=>{
    console.log('Server is in port ', app.get('port'));
});

//websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);


io.on('connection', (socket)=>{
    console.log('new Conecction', socket.id);
    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    });

});



