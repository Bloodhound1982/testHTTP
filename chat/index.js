'use strict';
let sockets = require('lib/sockets');

let chat = [];

let sendAll = function (data) {
    chat.push(data);

    sockets.sendMessageAll([data]);
};

let getLast = function () {
    
};

module.exports.sendAll = sendAll;
module.exports.getLast = getLast;