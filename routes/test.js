/**
 * Created by alex on 12.12.16.
 */
var express = require('express'),
    router = express.Router(),
    fs = require('fs'),                             //module that working with files
    content = fs.readFileSync('source/data.json'),  //read our json-file
    jsonArray = JSON.parse(content);                //parse json to object

router.get('/', function (req, res, next) {
    var result, objToRequest;

    if (req.query.id) {
        for (var i = 0; i < jsonArray.length; i++) {
            if (req.query.id === jsonArray[i].id) {
                result = jsonArray[i];
                break;
            }
        }
        objToRequest = !result ? {description: 'Error input!'} : result;
        res.send(JSON.stringify(objToRequest));
    } else {
        for (var i = 0; i < jsonArray.length; i++) {
            if (req.query.name.toLowerCase() === jsonArray[i].name.toLowerCase()) {
                result = jsonArray[i];
                break;
            }
        }
        objToRequest = !result ? {description: 'Error input!'} : result;
        res.send(JSON.stringify(objToRequest));
    }
});

module.exports = router;