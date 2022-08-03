var express = require('express');
const logger = require('../logger/logger');
var mailer = require('../email/mailer');
const User = require('../models/UserModel');
const Quote = require('../models/QuoteModel');
const moment = require('moment');
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
router.get('/resetpassword', function(req, res) {
  res.render('resetpassword',{'url': 'home'});
});
router.get('/passwordupdated', function(req, res) {
  res.render('passwordupdated',{'url': 'home'});
});

router.get('/loginfailed', function(req, res) {
  
  if (req.session) {
    req.session.destroy();
    
    res.render('loginfailed', { 'url': 'home' });
  }
});

router.get('/logout', function(req, res) {
  
  if (req.session) {
    req.session.destroy();
    
    
    res.render('logout', { 'url': 'home' });
  }
});
router.get('/emailconfirm', function(req, res, next) {
   
  res.render('emailconfirmed',{'url': 'home'});
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

router.get("/sendReminders", async function (req, res) {
  var random = Math.floor(Math.random() * 99);
  const quote = await Quote.findOne({}).skip(random);
  
  
  User.find({} , (err, users) => {
    if(err)
    logger.error("Error: "+err);
        User.find({} , (err, users) => {
        if(err) 
          logger.error("Error: "+err);
        
        
          users.map(user => {
          //send daily reminder
         
          try{  
             
            
            //send daily email
            var data = {
              templateName: "daily_reminder",
              
              receiver: user.email,   
              name:user.displayName,
              //progress data
              quote:quote.quote,
              author:quote.author,
           };
           //pass the data object to send the email
          // logger.debug("template to: "+data.templateName);
          // logger.debug("send email to: "+data.receiver);
          // logger.debug("send sender: "+data.sender);
          // logger.debug("send sender: "+data.name);
          // logger.debug("quote: "+quote.quote);
          // logger.debug("author: "+quote.author);
          
            mailer.sendEmail(data);
           
          
          }
          catch(error){
            logger.error(error);
            
          }
      
          
      });
         
  })

  });       
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Reminders email Successfully');
});
   
router.get("/getLastLogins", async function (req, res) {
  
  const today = moment();
  const startdate = today.subtract(14, "days");
  
  // moment('2010-10-20').isAfter('2009-12-31', 'year'); // true
   
  // const lastLoginCheck =new Date(today.getDate() - 14);//myPastDate is now 14 days in the past
  await User.find({}, function (err, users) {
    if(err)
      logger.error(err);
        
      users.map(user => {
        //check last login + 14 days. If true send email
        if (moment(user.lastloggedInDate).isBefore(startdate))
        try{  
             
            
          //send daily email
          var data = {
            templateName: "last_login",
            
            receiver: user.email,   
            name:user.displayName,
      
         };
         //pass the data object to send the email
        // logger.debug("template to: "+data.templateName);
        // logger.debug("send email to: "+data.receiver);
        // logger.debug("send sender: "+data.sender);
        // logger.debug("send sender: "+data.name);
        // logger.debug("quote: "+quote.quote);
        // logger.debug("author: "+quote.author);
        
          mailer.sendEmail(data);
         
        
        }
        catch(error){
          logger.error(error);
          
        }
      })
  });
 
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Last Login emails sent Successfully');
});  



module.exports = router;
