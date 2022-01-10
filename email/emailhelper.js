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
  
   
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: emailTo,
      from: 'info@gratitudetoday.org',
      subject: 'GratitudeToday Activate Account',
      html: '<strong>Welcome aboard '+firstName+'</strong><br><br>'+
      'Thanks for signing up! Our mission here is simple...<br><br>'+
      'Enjoy Reduced Stress. Better Sleep and Improved Self Esteem. 😊 <br><br>'+
      'Create a custom Journey to fit your lifestyle.🚀<br>'+
      emailUrl+'<br/><br/> ~ The GratitudeToday Community.'
      ,
    
    };
    logger.debug('send email...');
    sgMail.send(msg, function (err, email) {
    if (err) {
        logger.error("Mail issue (proxy)");
        return 1;
    }
    else {
        return 0;
    }
  });
			      
};

module.exports = new EmailHelper();