var express = require('express');
var router = express.Router();
var fs = require('fs');
var content = fs.readFileSync('source/data.json');
var jsonArray = JSON.parse(content);

/* GET users listing. */
router.get('/', function (req, res, next) {
    var result, objToRequest;

    if (req.query.id) {
        for (var i = 0; i < jsonArray.length; i++) {
            if (req.query.id === jsonArray[i].id) {
                result = jsonArray[i];
                break;
            }
        }
        objToRequest = !result ? {name: 'Error input!'}
            : result;
        res.send(JSON.stringify(objToRequest));
    } else {
        for (var i = 0; i < jsonArray.length; i++) {
            if (req.query.name.toLowerCase() === jsonArray[i].name.toLowerCase()) {
                result = jsonArray[i];
                break;
            }
        }
        objToRequest = !result ? {name: 'Error input!'}
            : result;
        res.send(JSON.stringify(objToRequest));
    }
});

module.exports = router;
