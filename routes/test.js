'use strict';
let express = require('express'),
    router = express.Router(),
    LanguagesModel = require('../lib/db/index').LanguagesModel;

router.get('/', function (req, res, next) {
    let objToRequest;

    if (req.query.id) {
        LanguagesModel.findOne({id: req.query.id})
            .lean().exec(function (err, lang) {
            if (err) __handleError(err);
            objToRequest = !lang ? {description: 'Error input!'} : JSON.stringify(lang);
            return res.send(objToRequest);
        });
    } else {
        LanguagesModel.findOne({name: new RegExp('^' +req.query.name + '$', 'i')})
            .lean().exec(function (err, lang) {
            if (err) __handleError(err);
            objToRequest = !lang ? {description: 'Error input!'} : JSON.stringify(lang);
            return res.send(objToRequest);
        });
    }
});

module.exports = router;