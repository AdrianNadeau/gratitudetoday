logger = require('../logger/logger')
const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY,HOST, NODE_PORT  } = require('../config.js');

var EmailReminder = function() {};

EmailReminder.prototype.sendReminderEmail = function(emailTo, firstName) {
   logger.debug(emailTo);
   logger.debug(firstName);
   
  
   
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: emailTo,
      from: 'gratitudetoday@adriannadeau.com',
      subject: 'GratitudeToday Progress Update',
      html: '<strong>Hello '+firstName+'</strong><br><br>'+
      'We hope you are enjoying the community and are progressing to your goals!<br><br>'+
      'Here is an update on your progress<br><br> (progress)<br><br>'+
      'Do not forget to keep up with your posts. Even small posts🚀<br>'+
      'Here is the gratitude today quote:'+
      '"This is the quote\"I am happy because I’m grateful. I choose to be grateful. That gratitude allows me to be happy. Will Arnett”'+
      '<br/> ~ The GratitudeToday Community.'
      ,
    
    };
    logger.debug('send reminder mail...');
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

module.exports = new EmailReminder();