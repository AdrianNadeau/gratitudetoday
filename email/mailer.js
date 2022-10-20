logger = require('../logger/logger')
require("custom-env").env();
const { SENDGRID_API_KEY } =  process.env.SENDGRID_API_KEY;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

templates = {
  account_confirm:  "d-109324885eb14ad7ac2a09a0d24898a1",
  daily_reminder:   "d-b6b62f190a2f4412881c97f1d70f8afa",
  reset_password: "d-8827b3f78bd54a248550e0212eb31f65",
  last_login: "d-17442af016b444ba96933f0b96df4883",
  send_progress: "d-76a220344f1f4b24ba739fa68620b279"
  
};

function sendEmail(data) {
  let msg;
 
  //logger.debug(data.templateName);
  
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
    // logger.debug("SEND EMAIL")
    // logger.debug(JSON.stringify(data));
    msg = {
      //extract the email details
      to: data.receiver,
      // to: "adrian@adriannadeau.com",
      from: "info@gratitudetoday.org",
    
      templateId: templates[data.templateName],
      //extract the custom fields 
      dynamic_template_data: {
        name:data.name,
        quote:data.quote,
        author:data.author,
        confirm_account_url:  data.confirm_account_url,
        reset_password_url: data.reset_password_url,
        // unsubscribe_url: data.unsubscribe_url
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
  else if(data.templateName=="send_progress"){
    //////////SEND Weekly Progress EMAIL///////////////
        //extract the custom fields 
    //   {
    //     "name":"Adrian",
    //     "progress_medal" : "https://www.gratitudetoday.org/assets/img/medals/bronze-tier.png",
    //     "progress_level" : "Bronze",
        
    //     "current_pts" : "120"
    // }
    logger.debug(data.templateName);
    logger.debug(data.name);
    logger.debug(data.progress_medal);
    logger.debug(data.progress_level);
    logger.debug(data.current_pts);
    

    msg = {
      //extract the email details
      to: data.receiver,
      // to: "adrian@adriannadeau.com",
      from: "info@gratitudetoday.org",
    
      templateId: templates[data.templateName],
  
      dynamic_template_data: {
        name:data.name,
        progress_medal:data.progress_medal,
        progress_level:data.progress_level,
        current_pts:data.current_pts,

        
      },
      
    };


  }

   
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
