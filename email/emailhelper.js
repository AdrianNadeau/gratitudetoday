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
  //  const emailUrl="<a href='"+url+"'>Click</a>";
  sgMail.setApiKey(SENDGRID_API_KEY)
  const msg = {
    to: emailTo, // Change to your recipient
    from: 'Gratitude Today <info@gratitudetoday.org>', // Change to your verified sender
    subject: 'Be Grateful Today!',
    // text: 'and easy to do anywhere, even with Node.js',
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    template_id: templateId,
    
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
  //  sgMail.setApiKey(SENDGRID_API_KEY)
  //  const msg = {
  //    to: emailTo, // Change to your recipient
  //    from: 'Gratitude Today <info@gratitudetoday.org>', // Change to your verified sender
  //    subject: 'Be Grateful Today!',
  //    html: '<strong>Welcome aboard '+firstName+'</strong><br><br>'+
  //   'Thanks for signing up! Our mission here is simple...<br><br>'+
  //   'Enjoy Reduced Stress. Better Sleep and Improved Self Esteem. 😊 <br><br>'+
  //   'Create a custom Journey to fit your lifestyle.🚀<br>',
  //    template_id: templateId
     
  //  }
  //  sgMail
  //  .send(msg)
  //  .then(() => {
  //    console.log('Email sent')
  //  })
  //  .catch((error) => {
  //    console.error("ERROR: "+error)
  //  })
  
};
EmailHelper.prototype.sendReminderEmail = function(emailFrom, templateId, firstname, email) {
  
  logger.debug(emailFrom);
  logger.debug(templateId);
  logger.debug(url);
  logger.debug(firstName);
 //  const emailUrl="<a href='"+url+"'>Click</a>";
  
  sgMail.setApiKey(SENDGRID_API_KEY)
  const msg = {
    to: emailTo, // Change to your recipient
    from: 'Gratitude Today <info@gratitudetoday.org>', // Change to your verified sender
    subject: 'Be Grateful Today!',
    html: '<strong>Welcome aboard '+firstName+'</strong><br><br>'+
   'Thanks for signing up! Our mission here is simple...<br><br>'+
   'Enjoy Reduced Stress. Better Sleep and Improved Self Esteem. 😊 <br><br>'+
   'Create a custom Journey to fit your lifestyle.🚀<br>',
    template_id: templateId
    
  }
  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error("ERROR: "+error)
  })
 
};

module.exports = new EmailHelper();