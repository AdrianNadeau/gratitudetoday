var express = require('express'),
router = express.Router();
User = require("../models/UserModel");
var logger = require('../logger/logger');
var mailer = require('../email/mailer');
var nodemailer=require("nodemailer");

var auth = require("firebase/auth");
var admin = require("firebase-admin");

User = require("../models/UserModel"),
mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');
router.use(express.json());

router.get('/activateAccount', function(req, res) {
  res.render('activated',{'url': 'home'});
  });
  
router.get('/login', function (req, res) {
res.render('loginpage', { 'url': 'home' });
});

router.get('/', function (req, res) {
res.render('register', { 'url': 'home' });
});

router.get('/logout', function (req, res) {
  res.render('logout', { 'url': 'home' });
});

router.get('/registersuccess', function (req, res) {
  //get user
  res.render('registersuccess', { 'url': 'home' });
 

});

//////////////////////////////////////
///         SIGNUP                  //
//////////////////////////////////////
router.post('/', async function(req, res) {
  
  const { SENDGRID_API_KEY } = require('../config.js');
 
  const {displayName, email, photoURL, accessToken} = req.body;
  console.log("email: "+email);
  
      try{ 
        var user = new User({
            
            accessToken: accessToken,
            displayName:displayName,
            email: email,
            photoURL: photoURL,

            displayOnBoard: true,
        });
         user.save(function (error, user) {
          console.log("save: "+email);
            
            if (error) {
              let errMessage= error.message;
              
              if(errMessage.includes("E11000")){
                logger.debug("current user.... login")
                
                admin.auth().getUserByEmail(email)
                  .then(function(userRecord) {
                    User.find({ email: userRecord.email}, function (err, docs) {
                      
                      if(docs){
                        
                        sess = req.session;
                        sess.userid = docs[0]._id;
                        res.send(JSON.stringify('LOGIN_USER'));
                        
                      }
                      
                    });
                  });
                    
                
              }
              else{
               //ignore and let user in
              }
            }
            else{
                try{  

                  //send confirm email
                  var data = {
                    templateName: "account_confirm",
                   
                    receiver: email,   
                    name:displayName,
                    
                    
                    
                 };
                 //pass the data object to send the email
                //  logger.debug("template to: "+data.templateName);
                //  logger.debug("send email to: "+data.receiver);
                //  logger.debug("send sender: "+data.sender);
                //  logger.debug("send sender: "+data.name);
                 mailer.sendEmail(data);
          
                }
                catch(error){
                  logger.error(error);
                  //ignore so user is still registered
                }
                  sess = req.session;
                  sess.userid = user._id;
                  res.send(user);
                
                  
            }
          });
        
    
    } catch (error) {
    
        //forward to error page
        logger.error(error);
        console.log("error: "+error);
        
    }     
    
});
//////////////////////////////////////
///         SEND PASSWORD RESET EMAIL                  //
//////////////////////////////////////
router.post('/sendResetEmail', async function(req, res) {
 
  
    
    const {email} = req.body;
    
      // Replace this URL with the URL where the user will complete sign-in.
      const actionCodeSettings = {
        url: 'https://www.gratitudetoday.org/users/auth/',
        handleCodeInApp: true
      }
 
  // Admin SDK API to generate the password reset link.
  logger.debug("reset to : "+email);
  await admin.auth()
    .generatePasswordResetLink(email, actionCodeSettings)
    .then((link) => {
      
      // Construct password reset email template, embed the link and send
     logger.debug(link);
      var data = {
        templateName: "reset_password",
        receiver: email,   
        returnURL:link,
     };
     //pass the data object to send the email
    
    //  mailer.sendEmail(data);
    //     var data = {
    //       templateName: "reset_password",
          
    //       receiver: email,   
    //       // name:"Adrian",
    //       resetURL: link,
    //   };
    
     logger.debug("in then");
    })
    .catch((error) => {
      // Some error occurred.
      logger.error("ERROR: "+error)
    });
  
}); 
    
    
 
///////////////////////////////////////
////        ACTIVATE USER            //
///////////////////////////////////////
  

router.post('/activateAccount/:id',async function(req, res) {
  
  const filter = { _id: mongoose.Types.ObjectId(req.params.id)};
  const update = { activated: true };
  
  
  User.findOneAndUpdate(filter, update).then(user => {
      sess = req.session;
      sess.userid = user._id;
      res.send(user);
 
 
  }).catch(error => { console.log(error) ;}); 
});
///////////////////////////////////////
////        GET ONBOARD FLAG         //
///////////////////////////////////////
  

router.get('/getDisplayOnBoard/',async function(req, res) {
  
  sess = req.session;
  User.findById(sess.userid, function (err, user) { 
    if(err)
      logger.debug(err);
    else
  
      res.send(user.displayOnBoard);

  });

});
router.post('/disableOnBoard/',async function(req, res) {
  
  sess = req.session;
  const filter = { _id: mongoose.Types.ObjectId(sess.userid)};
  const update = { displayOnBoard: false };
  
  User.findOneAndUpdate(filter, update).then(user => {
      
      res.send(false);
 
 
  }).catch(error => { console.log(error) ;}); 


});

module.exports = router;