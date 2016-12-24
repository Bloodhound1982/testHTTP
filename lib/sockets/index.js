'use strict';

const chat = require('lib/chat');

let Room = require('lib/chat/Room');
let Message = require('lib/chat/Message');

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
                io.to(data.room).emit('add old messages', rooms[roomIndex].getMessages());
            }
        });

        socket.on('new message', function (data) {
            let room = rooms.filter(function (elem, idx, arr) {
                return elem.getName() === data.room;
            })[0];
            let message = new Message(data.text);
            message.setUser(data.username);
            room.addMessage(message);
            io.to(data.room).emit('update messages', message);
        });

    });
};