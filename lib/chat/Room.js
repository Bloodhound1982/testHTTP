'use strict';

let Room = function(name) {
    this.name = name;
    this.users = [];
    this.messages = [];
};

Room.prototype.getName = function () {
    return this.name;
};

Room.prototype.addUser = function (username) {
    this.users.push(username);
};

Room.prototype.getUsers = function () {
    return this.users;
};

Room.prototype.addMessage = function (message) {
    this.messages.push(message);
};

Room.prototype.getMessages = function () {
    return this.messages;
};

Room.prototype.isHaveUser = function (username) {
    return this.users.indexOf(username) !== -1;
};

module.exports = Room;