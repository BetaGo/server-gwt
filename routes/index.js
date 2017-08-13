var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/funny', function(req, res, next) {
  res.render('funny.html');
});

module.exports = router;
