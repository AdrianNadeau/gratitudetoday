const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('./logger/logger');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
Post = require('./models/PostModel');
require('custom-env').env()


const { APP_ENV, PORT, DB_PORT, DATABASE,SESSION_SEACRET } = require('./config.js');
var app = express();
var r = require('request')

// By default cookies are disabled, switch it on
var request = r.defaults({ jar: true })
console.log("");
console.log("====================================START============================================");
console.log("");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


 db = mongoose.connect(DATABASE, { useNewUrlParser: true }).
  catch(error => console.error(error));

  app.use(session({
    secret: SESSION_SEACRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection:  mongoose.connection })
  }));

  logger.info("DB Running server on from port:::::::" + DB_PORT);
  mongoose.set('useFindAndModify', false);


// const res = Post.updateMany({ '_id' :{$ne: "1"}{ happiness: 3 });
// res.n; // Number of documents matched
// console.log(res.n);
// res.nModified; // Number of documents modified
// console.log(res.nModified);
//post get all
db.inventory.update( { tags: { $nin: [ "appliances", "school" ] } }, { $set: { sale: false } } )
