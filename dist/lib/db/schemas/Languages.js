'use strict';

var mongoose = require('mongoose');
var languageSchema = mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    imageUrl: String
});

var LanguagesModel = mongoose.model('Languages', languageSchema);

module.exports = LanguagesModel;
//# sourceMappingURL=Languages.js.map