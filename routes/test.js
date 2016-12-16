'use strict';
let express = require('express'),
    router = express.Router(),
    LanguagesModel = require('../lib/db/index').LanguagesModel;

router.get('/', function (req, res, next) {
    let objToResponse;
    let obgError = {
        status: 'error',
        description: 'Error input!',
        imageUrl: 'images/error.svg'
    };

    if (req.query.id) {
        LanguagesModel.findOne({id: req.query.id})
            .lean().exec(function (err, lang) {
            if (err) __handleError(err);
            objToResponse = !lang ? obgError : {status: 'ok', lang};
            return res.json(objToResponse);
        });
    } else {
        LanguagesModel.findOne({name: new RegExp('^' + req.query.name + '$', 'i')})
            .lean().exec(function (err, lang) {
            if (err) __handleError(err);
            objToResponse = !lang ? obgError : {status: 'ok', lang};
            return res.json(objToResponse);
        });
    }
});

module.exports = router;