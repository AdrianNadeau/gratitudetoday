const  SENDGRID_API_KEY  = "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";

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY)

const emailUrl="<a href='http://localhost:3000/users/auth/activateAccount/?id=615a080d31651bf3af165cd8'>Click</a>";
console.log(emailUrl)
const msg = {
  // to: 'adriannadeau.art@gmail.com', // Change to your recipient
  to: 'adrian@adriannadeau.com', // Change to your recipient
  from: 'adrian@adriannadeau.com', // Change to your verified sender
  subject: 'GratitudeToday Activate Account',
  //template_id: "d-cfac2481e5274fd7bf44d72063d3986f",
  text: 'Click link below to activate your account.'+emailUrl,
  html: '<strong>Activate Link - </strong>'+emailUrl,
}
console.log("MSG: "+msg.html)
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })