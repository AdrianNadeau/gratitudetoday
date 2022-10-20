var express = require('express'),
router = express.Router();
User = require("../models/UserModel");
var logger = require('../logger/logger');
var mailer = require('../email/mailer');
var SibApiV3Sdk = require('sib-api-v3-sdk');

require("custom-env").env();
const { SENDGRID_API_KEY } =  process.env.SENDGRID_API_KEY;
const { SENDINBLUE_API_KEY } =  process.env.SENDINBLUE_API_KEY;


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
                  
                  var defaultClient = SibApiV3Sdk.ApiClient.instance;
                  
                  // Configure API key authorization: api-key
                  var apiKey = defaultClient.authentications['api-key'];
                  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

                  var partnerKey = defaultClient.authentications['partner-key'];
                  partnerKey.apiKey = process.env.SENDINBLUE_API_KEY;
                  
                  
                  var contactApiInstance = new SibApiV3Sdk.ContactsApi();
                  var createContact = new SibApiV3Sdk.CreateContact(); // CreateContact | Values to create a contact
                  logger.debug("NAME: "+displayName)
                  var opts = { 
                    'email': email, 
                    'listIds': [5],
                    "FIRSTNAME" : displayName,
                   
                  };
                  logger.debug("creat contact");

                  contactApiInstance.createContact(opts).then(function(data) {
                    console.log('API called successfully. Returned data: ' + data.id);

                    //send email now to confirm
                    contactApiInstance = new SibApiV3Sdk.ContactsApi();

                    let identifier = email;
                    var opts = { 
                      'email': email, 
                      'templateId': [5],
                      "name" : displayName,
                     
                    };
                    contactApiInstance.getContactInfo(identifier).then(function(data) {
                      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
                      //we have the email, send the transactional email with id of 9 for welcome
                      let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

                      let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

                      sendSmtpEmail.templateId=9;
                      sendSmtpEmail.subject="Confirm your email to activate account.";
                      sendSmtpEmail.to = [{"Email":"adrian@adriannadeau.com","name":"Adrian"}];
                      
                      // sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};

                      apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
                        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
                      }, function(error) {
                        console.error(error);
                      });

                    }, function(error) {
                      console.error("!!!!ERROR: "+error);
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'text/plain');
                      res.end('User exists');
                      
                      
                    });

                  }, function(error) {
                    console.error("ERROR2: "+error);
                  });
                  
                  // const SibApiV3Sdk = require('sib-api-v3-sdk');
                  // let defaultClient = SibApiV3Sdk.ApiClient.instance;
                  
                  // let apiKey = defaultClient.authentications['api-key'];
                  // apiKey.apiKey = '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';
                  // // Configure API key authorization: partner-key
                  // var partnerKey = defaultClient.authentications['partner-key'];
                  // partnerKey.apiKey = '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';
                  
                  // var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
                  // var opts = { 
                  //   // 'email': "adrian@adriannadeau.com", // String | Mandatory if templateId and messageId are not passed in query filters. Email address to which transactional email has been sent.
                  //   'templateId': 9, // Number | Mandatory if email and messageId are not passed in query filters. Id of the template that was used to compose transactional email.
                  //   'messageId': "messageId_example", // String | Mandatory if templateId and email are not passed in query filters. Message ID of the transactional email sent.
                  //   // 'startDate': "startDate_example", // String | Mandatory if endDate is used. Starting date (YYYY-MM-DD) from which you want to fetch the list. Maximum time period that can be selected is one month.
                  //   // 'endDate': "endDate_example", // String | Mandatory if startDate is used. Ending date (YYYY-MM-DD) till which you want to fetch the list. Maximum time period that can be selected is one month.
                  //   // 'sort': "desc", // String | Sort the results in the ascending/descending order of record creation. Default order is **descending** if `sort` is not passed
                  //   // 'limit': 500, // Number | Number of documents returned per page
                  //   // 'offset': 0 // Number | Index of the first document in the page
                  // };
                  // apiInstance.getTransacEmailsList(opts).then(function(data) {
                  //   console.log('API called successfully. Returned data: ' + data);
                  // }, function(error) {
                  //   console.error(error);
                  // });
                  //send confirm email
                //   var data = {
                //     templateName: "account_confirm",
                   
                //     receiver: email,   
                //     name:displayName,
                    
                    
                    
                //  };
                
                //  mailer.sendEmail(data);
          
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