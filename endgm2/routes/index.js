var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//flash creation
router.get('/failed', function(req, res, next) {
  req.flash('age',12);
  req.flash('name','sai')
  res.send('bangaya')
});

//check flash message and data transfer
router.get('/checkfailed', function(req, res, next) {
  console.log(req.flash('age'),req.flash('name'))
  res.send('check backend ke terminal par');
});


module.exports = router;
