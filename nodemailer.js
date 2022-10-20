
// "use strict";
// const nodemailer = require("nodemailer");
// require("custom-env").env();
// var cors = require('cors')

// const smtpPort= process.env.SENDINBLUE_PORT;
// console.log("port: "+smtpPort)
// const smtpHost= process.env.SENDINBLUE_SMTP;
// console.log("smtpHost: "+smtpHost)

// const smtpUser= process.env.SENDINBLUE_USER;
// console.log("smtpUser: "+smtpUser)
// const smtpPass= process.env.SENDINBLUE_PASS;
// console.log("smtpPass: "+smtpPass)

// const smtpFromName= process.env.SENDINBLUE_FROM_NAME;
// console.log("smtpFromName: "+smtpFromName)
// const smtpFromEmail= process.env.SENDINBLUE_FROM_EMAIL;
// console.log("smtpFromEmail: "+smtpFromEmail)

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: smtpHost,
//     port: smtpPort,
    
//     auth: {
//       user: smtpUser, // generated ethereal user
//       pass: smtpPass // generated ethereal password
//     },
//   });
//   const fromValue=""+smtpFromName+" <info@gratitudetoday.org>"
//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: fromValue, // sender address
//     to: "adrian@adriannadeau.com",
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

 
// }

// main().catch(console.error);

const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let opts = { 
  'templateStatus': true,
  'limit': 50, 
  'offset': 0 
};

apiInstance.getSmtpTemplates(opts).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function(error) {
  console.error(error);
});