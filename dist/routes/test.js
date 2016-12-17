'use strict';

var express = require('express');
var router = express.Router();
var LanguagesModel = require('lib/db').LanguagesModel;

router.get('/', function (req, res, next) {
    console.log('from test');
    res.render('test');
});

router.get('/query', function (req, res, next) {
    var objToResponse = void 0;
    var obgError = {
        status: 'error',
        description: 'Error input!',
        imageUrl: 'images/error.svg'
    };

    if (req.query.id) {
        LanguagesModel.findOne({ id: req.query.id }).lean().exec(function (err, lang) {
            if (err) __handleError(err);
            objToResponse = !lang ? obgError : { status: 'ok', lang: lang };
            return res.json(objToResponse);
        });
    } else {
        LanguagesModel.findOne({ name: new RegExp('^' + req.query.name + '$', 'i') }).lean().exec(function (err, lang) {
            if (err) __handleError(err);
            objToResponse = !lang ? obgError : { status: 'ok', lang: lang };
            return res.json(objToResponse);
        });
    }
});

module.exports = router;
//# sourceMappingURL=test.js.map