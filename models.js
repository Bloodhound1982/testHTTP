/**
 * Created by alex on 13.12.16.
 */
var mongoose = require('mongoose');

mongoose.model('Document', {
    properties: ['id', 'name', 'description', 'imageUrl'],
    indexes: ['id']
});

exports.Document = function(db) {
    return db.model('Document');
};