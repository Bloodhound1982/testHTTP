'use strict';
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection db error:'));
db.once('open', function () {
    console.log('connection to db is success!');
});

module.exports.mongoose = mongoose;

module.exports.LanguagesModel = require('./schemas/Languages');