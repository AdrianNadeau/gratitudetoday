logger = require('../logger/logger')
const { SENDGRID_API_KEY } = require('../config.js');

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

templates = {
  account_confirm:  "d-109324885eb14ad7ac2a09a0d24898a1",
  daily_reminder:   "d-b6b62f190a2f4412881c97f1d70f8afa",
  
};

function sendEmail(data) {
   const msg = {
      //extract the email details
      to: data.receiver,
      from: data.sender,
      templateId: templates[data.templateName],
      //extract the custom fields 
      dynamic_template_data: {
        name: data.name,
        confirm_account_url:  data.confirm_account__url,
        reset_password_url: data.reset_password_url
     }
    };
    //send the email
    sgMail.send(msg, (error, result) => {
      if (error) {
          console.log(error);
      } else {
          console.log("That's wassup!");
      }
    });
}
exports.sendEmail = sendEmail;
