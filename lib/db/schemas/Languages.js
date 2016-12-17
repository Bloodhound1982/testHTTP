'use strict';
let mongoose = require('mongoose');
let languageSchema = mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    imageUrl: String
});

let LanguagesModel = mongoose.model('Languages', languageSchema);

module.exports = LanguagesModel;

