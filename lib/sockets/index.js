'use strict';

const chat = require('lib/chat');

let Room = require('lib/chat/Room');

let rooms = [],
    connection = 0;


module.exports.up = function (io) {
    io.on('connection', function (socket) {
        console.log('socket is connected! connection #' + ++connection);
        socket.emit('testConnect', {connection: true});

        socket.on('create room', function (data) {
            let tempArray = rooms.filter(function (elem, idx, arr) {
                return elem.getName() === data.room;
            });
            if (tempArray.length) {
                socket.emit('error create room', {error: 'Room has already existed!'});
            } else {
                socket.join(data.room);
                let room = new Room(data.room);
                room.addUser(data.user);
                rooms.push(room);
                io.to(room.getName()).emit('add room', room.getName());
                io.to(room.getName()).emit('add client', room.getUsers()[0]);
            }
        });

        socket.on('try join', function (data) {
            let isUserNameCorrect = true;
            let isRoomNameCorrect = false;
            let roomIndex = 0;
            rooms.forEach(function (elem, idx, arr) {
                if (elem.getName() === data.room) {
                    socket.join(data.room);
                    isRoomNameCorrect = true;
                    roomIndex = idx;
                }
                elem.getUsers().forEach(function (el, id, a) {
                    if (el === data.user) {
                        isUserNameCorrect = false;
                    }
                });
            });
            if (isRoomNameCorrect && isUserNameCorrect) {
                rooms[roomIndex].addUser(data.user);
                socket.emit('after join', {
                    room: rooms[roomIndex].getName(),
                    user: data.user
                });
                io.to(data.room).emit('update clients', rooms[roomIndex].getUsers());
            }
        });

        socket.on('new message', function (data) {

        });




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