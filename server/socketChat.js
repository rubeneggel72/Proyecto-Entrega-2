const uuid = require('uuid');
const getDateTime = require('../util/fecha-hora.js')
const create = require("../db/perdurarMensajes");

const socketChat = (socket, io,connections) => {

    let users = [];

    //listen  change_username
    socket.on('change_username', data => {
        let id = uuid.v4();
        socket.id = id;
        socket.username = data.nickName;
        users.push({ id, username: socket.username, color: socket.color });
        updateUsernames();
    })

    //update Usernames en cliente
    const updateUsernames = () => {
        io.sockets.emit('get users', users);
    }

    //listen nuevo mensaje
    socket.on('new_message', (data) => {

        //broadcast nuevo mensaje
        const messageEmit = { message: data.message, username: socket.username, date: getDateTime() }
        const obj = { message: data.message, username: socket.username }
        console.log(messageEmit);
        create(obj);
        io.sockets.emit('new_message', messageEmit);
    })

    //listen tipeo en chat
    socket.on('typing', data => {
        socket.broadcast.emit('typing', { username: socket.username });
    })

    //Desconeccion de usuario
    socket.on('disconnect', data => {
        if (!socket.username)
            return;
        //encontrar usuario y borrarlo de la lista de conectados
        let user = undefined;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === socket.id) {
                user = users[i];
                break;
            }
        }
        users = users.filter(x => x !== user);

        //actualiza lista usuarios conectados
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
    })
}
module.exports = socketChat