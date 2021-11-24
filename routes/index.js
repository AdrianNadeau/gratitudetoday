

var express = require('express');
const logger = require('../logger/logger');
const User = require('../models/UserModel');
var router = express.Router();

// Ping to keep Heroku dyno up
router.get('/ping', function(req, res, next) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Loaded Successfully');
});
/* GET home page. */
router.get('/', function(req, res, next) {
   
  res.render('index',{'url': 'home'});
});

router.get('/ajaxtest', function(req, res) {
  
  res.render('ajaxtest',{'url': 'home'});
});

router.get('/sessionexpired', function(req, res) {
  res.render('sessionexpired',{'url': 'home'});
});
router.get('/error', function(req, res) {
  res.render('error',{'url': 'home'});
});
router.get('/contact', function(req, res) {
  res.render('contact',{'url': 'home'});
});
router.get('/terms', function(req, res) {
  res.render('terms',{'url': 'home'});
});
router.get('/privacy', function(req, res) {
  res.render('privacy',{'url': 'home'});
});
router.get('/coffee', function(req, res) {
  res.render('coffee',{'url': 'home'});
});

router.get('/logout', function(req, res) {
  
  if (req.session) {
    req.session.destroy();
    
    
    res.render('logout', { 'url': 'home' });
  }
});

router.get('/admin', function(req, res) {
  res.render('admin',{'url': 'home'});
});
router.get('/adminlogin', function(req, res) {
  var emailValue = req.query.email;
  
  User.find({ email: emailValue}, function (err, user) {
    sess = req.session;
    
    sess.userid = user[0]._id;
    res.send(user);

    
  });
 
});


module.exports = router;