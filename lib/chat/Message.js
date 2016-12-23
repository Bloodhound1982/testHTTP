'use strict';

let Message = function(text) {
    this.text = text;
    this.date = new Date();
    this.user = "";
};

Message.prototype.getText = function () {
    return this.text;
};

Message.prototype.getDate = function () {
    return this.date;
};

Message.prototype.getUser = function () {
    return this.user;
};

Message.prototype.setUser = function (user) {
    this.user = user;
};

module.exports = Message;