var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.json('HUrray Welcome To Home Page');
});

module.exports = router;
