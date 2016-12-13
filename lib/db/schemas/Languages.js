/**
 * Created by alex on 13.12.16.
 */
var mongoose = require('mongoose');
var languageSchema = mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    imageUrl: String
});

var LanguagesModel = mongoose.model('Languages', languageSchema);

module.exports = LanguagesModel;

