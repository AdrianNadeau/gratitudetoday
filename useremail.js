//export users for email
logger = require('../logger/logger')
const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY,HOST, NODE_PORT  } = require('../config.js');
const emailreminder = require('./email/emailreminder');
User = require("../models/UserModel"),
mongoose=require('mongoose');
emailreminder = require('../email/emailreminder');


router.get('/', function(req, res) {
  
    try{
        var q = User.find({});
        q.exec(function(err, users) {
          if (err){ 
              logger.error(err.message);
              res.send(err.message);
              next();  
          }
          //send email to subscribed users (with update later)
          //users
          users.forEach(function(u) {
            //send email
            emailSent = emailreminder.sendReminderEmail(u.email)
            console.log(u);
              
            
          });
        
        })
    }
    catch(err){
      //no posts yet, load page anyway
      logger.error(err.message);
      res.send(err.message);
      next();  
    }
  });


emailSent = emailreminder.sendReminderEmail("adrian@adriannadeau.com","gratitudetoday@adriannadeau.com")
