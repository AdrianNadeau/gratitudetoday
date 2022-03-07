const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");
templates = {
  account_confirm:  "d-a02ad738dfc8404c8da016b46a754805",
  daily_reminder:   "d-da08810607304f5c8f0d0c3aef86b45c ",
  
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
