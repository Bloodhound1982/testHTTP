'use strict';

var chat = require('chat');

module.exports.up = function (io) {
    io.on('connection', function (socket) {
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
        console.log('connected!');
    });

    module.exports.sendAll = function (eventName, data) {
        //   io.sockets.emit(eventName, data);
    };

    module.exports.sendMessageAll = function (eventName, data) {
        //  sendAll(eventName, data);
    };
};
//# sourceMappingURL=index.js.map