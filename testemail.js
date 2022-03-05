// const  SENDGRID_API_KEY  = "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";

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(SENDGRID_API_KEY)

// // const emailUrl="<a href='http://localhost:3000/users/auth/activateAccount/?id=615a080d31651bf3af165cd8'>Click</a>";
// // console.log(emailUrl)
// const msg = {
//   // to: 'adriannadeau.art@gmail.com', // Change to your recipient
//   to: 'adrian@adriannadeau.com', // Change to your recipient
//   from: 'info@gratitudetoday.org', // Change to your verified sender
//   subject: 'GratitudeToday Activate Account',
//   template_id: "d-109324885eb14ad7ac2a09a0d24898a1",
//   text: 'Click link below to activate your account.',
//   html: '<strong>Activate Link - </strong>',
// }

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

//   // confirm - d-109324885eb14ad7ac2a09a0d24898a1
//   // reminder - d-da08810607304f5c8f0d0c3aef86b45c

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")
const msg = {
  to: 'adrian@adriannadeau.com', // Change to your recipient
  from: 'info@gratitudetoday.org', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  template_id: "d-109324885eb14ad7ac2a09a0d24898a1",
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  name: 'Adrian'
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })