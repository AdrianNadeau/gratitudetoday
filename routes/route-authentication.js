var express = require('express'),

router = express.Router();
User = require("../models/UserModel");
var logger = require('../logger/logger');
var emailHelper = require('../email/emailhelper');
const { HOST, NODE_PORT}  = require('../config.js');

const saltRounds = 10;


//Firebase Auth UI
// var firebase = require('firebase');
require("firebase/auth");

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
              logger.error(errMessage);
              if(errMessage.includes("E11000")){
                logger.debug("CURRENT USER");
                
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
                const error = new Error('Error Logging in, please try again or contact us.');
                return res.send(JSON.stringify(error.message));
              }
            }
            else{
                  //send template email confirm
                  //emailTo, emailFrom, templateId, url, first,Name, template_id
                  let emailReturn=emailHelper.sendActivateEmail(email,"info@gratitudetoday.org", "d-cfac2481e5274fd7bf44d72063d3986f","https://www.gratitudetoday.org/emailconfirm",displayName)
                  
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
 
///////////////////////////////////////
////        ACTIVATE USER            //
///////////////////////////////////////
  

router.post('/activateAccount/:id',async function(req, res) {
  
  const filter = { _id: mongoose.Types.ObjectId(req.params.id)};
  const update = { activated: true };
  console.log("id: "+req.params.id);
  
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