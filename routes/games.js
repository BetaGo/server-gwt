const express = require('express');
const router = express.Router();

router.get('/2048', function(req, res, next) {
  res.render('2048');
});

router.get('/ninja', function(req, res, next) {
  res.render('ninja');
})


module.exports = router