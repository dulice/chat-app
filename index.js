const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room);
    });
    
    socket.on('userData', (payload) => {
        io.to(payload.room).emit('userData', payload.name);
        // console.log(payload);
    });

    socket.on('message', (payload) => {
        io.to(payload.room).emit('message', {name: payload.name, message: payload.message});
    })

})

http.listen(5000, () => {
    console.log('connect to server!');
})