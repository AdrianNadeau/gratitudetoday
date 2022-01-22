logger = require('../logger/logger')
const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY,HOST, NODE_PORT  } = require('../config.js');

var EmailHelper = function() {};

EmailHelper.prototype.sendActivateEmail = function(emailTo, emailFrom, templateId, url, firstName) {
   logger.debug(emailTo);
   logger.debug(emailFrom);
   logger.debug(templateId);
   logger.debug(url);
   logger.debug(firstName);
   const emailUrl="<a href='"+url+"'>Click</a>";
   sgMail.setApiKey(SENDGRID_API_KEY)
   const msg = {
     to: 'adrian@adriannadeau.com', // Change to your recipient
     from: 'Gratitude Today <info@gratitudetoday.org>', // Change to your verified sender
     subject: 'Be Grateful Today!',
     html: '<strong>Welcome aboard '+firstName+'</strong><br><br>'+
    'Thanks for signing up! Our mission here is simple...<br><br>'+
    'Enjoy Reduced Stress. Better Sleep and Improved Self Esteem. 😊 <br><br>'+
    'Create a custom Journey to fit your lifestyle.🚀<br>',
     template_id: 'd-cfac2481e5274fd7bf44d72063d3986f'
     
   }
   sgMail
     .send(msg)
     .then(() => {
       console.log('Email sent')
       if (err) {
              logger.error("Mail issue (proxy)");
              return 1;
          }
          else {
              return 0;
          }
     })
     .catch((error) => {
       console.error(error)
     })
   
    // sgMail.setApiKey(SENDGRID_API_KEY);
    // const msg = {
    //   to: emailTo,
    //   from: 'info@gratitudetoday.org',
    //   subject: 'GratitudeToday Activate Account',
    //   html: '<strong>Welcome aboard '+firstName+'</strong><br><br>'+
    //   'Thanks for signing up! Our mission here is simple...<br><br>'+
    //   'Enjoy Reduced Stress. Better Sleep and Improved Self Esteem. 😊 <br><br>'+
    //   'Create a custom Journey to fit your lifestyle.🚀<br>'+
    //   emailUrl+'<br/><br/> ~ The GratitudeToday Community.'
    //   ,
    
    // };
  //   logger.debug('send email...');
  //   sgMail.send(msg, function (err, email) {
  //   if (err) {
  //       logger.error("Mail issue (proxy)");
  //       return 1;
  //   }
  //   else {
  //       return 0;
  //   }
  // });
			      
};

module.exports = new EmailHelper();