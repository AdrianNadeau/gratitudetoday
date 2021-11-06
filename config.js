const { env } = require('custom-env');
// config.js
// const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// dotenv.config();
module.exports = {
  APP_ENV:process.env.APP_ENV,
  NODE_PORT: process.env.NODE_PORT,
  DB_PORT:process.env.DB_PORT,
  DATABASE: process.env.DATABASE,
  HOST: process.env.HOST,
  SESSION_SEACRET:process.env.SESSION_SEACRET,
  SENDGRID_API_KEY:process.env.SENDGRID_API_KEY,
  SENDGRID_TEMPLATE_ID: process.env.SENDGRID_TEMPLATE_ID,
  FIREBASE_ADMIN_SDK: process.env.FIREBASE_ADMIN_SDK,
  
  FIREBASE_API_KEY:process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN:process.env.FIREBASE_AUTH_DOMAIN,
  // FIREBASE_STORAGE_BUCKET:process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID:process.env.FIREBASE_MESSAGING_SENDER_ID,
  // FIREBASE_DATABASE_URL:env.FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID:env.FIREBASE_PROJECT_ID,
  FIREBASE_APP_ID:process.env.FIREBASE_APP_ID
  
};
