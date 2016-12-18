'use strict';

var chat = require('lib/chat');

var rooms = [],
    messages = [];

module.exports.up = function (io) {
    io.on('connection', function (socket) {
        console.log('socket is connected!');
        socket.emit('testConnect', { connection: true });

        socket.on('create room', function (data) {
            socket.join(data.room);

            var room = {
                roomName: data.room,
                users: [],
                messages: []
            };
            room.users.push(data.user);
            rooms.push(room);
            io.to(room.roomName).emit('add room', data.room);
            io.to(room.roomName).emit('add client', data.user);
        });

        /*socket.on('new message', function (data) {
            console.log(data.username);
            console.log(new Date(data.date).getDate());
            console.log(data.text);
        });*/

        /*
                let name = false;
                 socket.emit('messages', chat_parts.getLast());
                 socket.on('name/set', function(data) {
                    console.log('set name', name);
                    name = data;
                });
                 socket.on('message', function(data) {
                    let message = {
                        name: data.name,
                        message: data.message
                    };
                    console.log(message);
                    chat.send(message);
                });*/
    });

    // module.exports.sendAll = function (eventName, data) {
    //    io.sockets.emit(eventName, data);
    // };
    //
    // module.exports.sendMessageAll = function (eventName, data) {
    //    sendAll(eventName, data);
    // }
};
//# sourceMappingURL=index.js.map