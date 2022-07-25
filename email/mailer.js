logger = require('../logger/logger')
const { SENDGRID_API_KEY } = require('../config.js');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

templates = {
  account_confirm:  "d-109324885eb14ad7ac2a09a0d24898a1",
  daily_reminder:   "d-b6b62f190a2f4412881c97f1d70f8afa",
  reset_password: "d-8827b3f78bd54a248550e0212eb31f65",
  last_login: "d-17442af016b444ba96933f0b96df4883"
  
};

function sendEmail(data) {
  let msg;
  logger.debug(data);
  logger.debug(data.templateName);
  
  if(data.templateName=="account_confirm"){
    //////////SEND CONFIRM EMAIL///////////////
    msg = {
        //extract the email details
        to: data.receiver,
        from: "info@gratitudetoday.org",
        // subject: "Your daily update!",
        templateId: templates[data.templateName],
        //extract the custom fields 
        dynamic_template_data: {
          name: data.name,
          quote: data.quote,
          author: data.author,
          confirm_account_url:  data.confirm_account_url,
          reset_password_url: data.reset_password_url
        }
    };
  }
  else if(data.templateName=="reset_password"){
    //////////SEND RESET PASSWORD EMAIL///////////////
    
    msg = {
      //extract the email details
      to: data.receiver,
      from: "info@gratitudetoday.org",
    
      templateId: templates[data.templateName],
      //extract the custom fields 
      dynamic_template_data: {
        // name: "Ade",
        resetURL: data.returnURL,
        confirm_account_url:  data.confirm_account_url,
        reset_password_url: data.reset_password_url
      }
    };
  }
  else if(data.templateName=="daily_reminder"){
    //////////SEND DAILY EMAIL///////////////
    
    logger.debug(JSON.stringify(data));
    msg = {
      //extract the email details
      to: data.receiver,
      from: "info@gratitudetoday.org",
    
      templateId: templates[data.templateName],
      //extract the custom fields 
      dynamic_template_data: {
        name:data.name,
        quote:data.quote,
        author:data.author,
        confirm_account_url:  data.confirm_account_url,
        reset_password_url: data.reset_password_url
      }
    };//


  }
  else if(data.templateName=="last_login"){
    //////////SEND Weekly last login EMAIL///////////////
    
    logger.debug(JSON.stringify(data));
    msg = {
      //extract the email details
      to: data.receiver,
      from: "info@gratitudetoday.org",
    
      templateId: templates[data.templateName],
      //extract the custom fields 
      dynamic_template_data: {
        name:data.name,
        
        confirm_account_url:  data.confirm_account_url,
        reset_password_url: data.reset_password_url,
        last_login: data.last_login
      }
    };


  }

    //send the email
    sgMail.send(msg, (error, result) => {
      if (error) {
          logger.error(error);
          //use another method if error thrown (probably over max per day)
      } else {
          console.log("That's wassup!");
      }
    });
}
exports.sendEmail = sendEmail;
