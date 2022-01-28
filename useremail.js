
//get all users and send daily email reminder email
//export users for email
logger = require('./logger/logger')
const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY } = require('./config.js');
// const emailreminder = require('./email/emailreminder');
User = require("./models/UserModel"),
mongoose=require('mongoose');
// emailreminder = require('../email/emailreminder');

sgMail.setApiKey(SENDGRID_API_KEY)
const msg = {
  to: 'adrian@adriannadeau.com', // Change to your recipient
  from: 'Gratitude Today <info@gratitudetoday.org>', // Change to your verified sender
  subject: 'Be Grateful Today!',
  // text: 'and easy to do anywhere, even with Node.js',
  // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  template_id: 'd-da08810607304f5c8f0d0c3aef86b45c',
  // name : 'Adrian',
  // url : 'http://www.gratitudetoday.org/emailconfirm'
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

  // //confirm
  // d-109324885eb14ad7ac2a09a0d24898a1
  // //reminder
  // d-da08810607304f5c8f0d0c3aef86b45c 