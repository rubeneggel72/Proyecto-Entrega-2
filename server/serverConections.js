const socketBroadcastProductos = require('./socketProductos')
const socketChat = require('./socketChat')
const socketConection = (app) => {
    const server = app.listen(process.env.PORT || 8080);
    const io = require("socket.io")(server)

    let connections = [];

    io.on('connection', (socket) => {
        console.log('New user connected');
        connections.push(socket)
        socket.username = 'Anonymous';

        socketBroadcastProductos(socket);
        socketChat(socket, io,connections)
    })
}
module.exports = socketConection