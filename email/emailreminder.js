"use strict";
const nodemailer = require("nodemailer");
// logger = require('../logger/logger')
const { SENDGRID_API_KEY,HOST, NODE_PORT  } = require('../config.js');



// async..await is not allowed in global scope, must use a wrapper
async function main() {

  //get all users who want to recevie the
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // var transport = nodemailer.createTransport({
  //   host: "smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "68ee7d6592accd",
  //     pass: "65feada484ae68"
  //   }
  // });
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "68ee7d6592accd",
      pass: "65feada484ae68"
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'info@gratitudetoday.org', // sender address, change to .env
    to: "adrian@adriannadeau.com , adrian@adriannadeau.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
