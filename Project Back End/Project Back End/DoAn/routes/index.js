var express = require('express');
var router = express.Router();
router = require('../Controller_Admin/AddCategory');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Home');
});

module.exports = router;
