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
                      logger.debug("email: "+userRecord.email)
                      if(docs){
                        try{
                          let date_ob = new Date();
                          const filter = { email: email };
                          const update = { lastloggedInDate: date_ob };
                         
                          
                          let user = User.findOneAndUpdate(filter, update).then((err, docs) => {
                            // if(err)
                            //   logger.error("err: "+err.errMessage); 
                            
                            
                              
                          });
                          logger.debug("updated last login for : "+email);
                          sess = req.session;
                          sess.userid = docs[0]._id;
                          res.send(JSON.stringify('LOGIN_USER'));
                          
                          
                        }
                        catch(error){
                          // logger.error("error: "+error);
                          //we don't care login the user
                        }
                        
                        
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
   // Replace this URL with the URL where the user will complete sign-in.
   const actionCodeSettings = {
    url: 'https://www.gratitudetoday.org/users/auth/',
    handleCodeInApp: true
  }
  //get email from form
  var email = req.body.email;
  logger.debug("reset to : "+email);
  await admin.auth()
    .generatePasswordResetLink(email, actionCodeSettings)
    .then((link) => {
       // Construct password reset email template, embed the link and send
        try{
            //send confirm email
            var data = {
                         templateName: "reset_password",
                        receiver: email,   
                        returnURL:link,
                    
            };
            mailer.sendEmail(data);
          }
          catch(error){
              logger.error(error);
                  //ignore so no big deal
          }
    });
      // }).then((data) => {
      //   //we have data, send the email now.
      //   logger.debug("send email: "+email);
      //   mailer.sendEmail(data);
      //   res.send(email);
      // }).catch(logger.error("error"));
      

  // logger.debug("reset to : "+email);
  // await admin.auth()
  //   .generatePasswordResetLink(email, actionCodeSettings)
  //   .then((link) => {
  //       // Construct password reset email template, embed the link and send
  //       logger.debug(link);
  //         var data = {
  //           templateName: "reset_password",
  //           receiver: email,   
  //           returnURL:link,
  //       };
  //       // res.send(email);
        
  //   }).then((link) => {
    
  //   });
    
 
}); 
        
 
        
    
    //  res.send(email);
        
    
    
  

 
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