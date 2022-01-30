require("custom-env").env();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("./logger/logger");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
const r = require("request");

const app = express();

const {
  APP_ENV,
  NODE_PORT,
  DB_PORT,
  DATABASE,
  SESSION_SEACRET,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
} = require("./config.js");

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
require("firebase/app");
require("firebase/auth");

const admin = require("firebase-admin");
const serviceAccount = require("./gratitudetoday-2e630-firebase-adminsdk-sx0pq-b907b6e239.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gratitudetoday-2e630.firebaseapp.com", //CALLBACK URLS https://gratitudetoday-2e630.firebaseapp.com
});

const indexRouter = require("./routes/index.js");
const userAccountRouter = require("./routes/route-user-account.js");
const postsRouter = require("./routes/posts.js");
const authRouter = require("./routes/route-authentication");

// By default cookies are disabled, switch it on
var request = r.defaults({ jar: true });
console.log("");
console.log(
  "====================================START============================================"
);
console.log("");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

logger.debug("DB: " + DATABASE);
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    connectWithNoPrimary: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.error(error));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: SESSION_SEACRET,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    cookie: { maxAge: 1800000 },
  })
);

logger.info("DB Running server on from port::::::" + "4000");
mongoose.set("useFindAndModify", false);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(__dirname + "/public"));

//app route to upload avatar and other images
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/users/account", userAccountRouter);
app.use("/users/auth", authRouter);

app.use(function (req, res, next) {
  console.log("req.session.userid", req.session);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});
app.enable("etag");
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error("Not found");
  error.status(404);
  next(error);
});

app.use(function (req, res, next) {
  res.locals.userid = req.session.userid;
  next();
});

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error", { url: "home" });
});
var port_number = process.env.PORT || 3000;

app.listen(port_number);
console.log("App running on Port:" + port_number);
// console.log(global.gConfig.mailjet_api_key);
// app.listen(port, () => {
//   logger.info(APP_ENV + " Running... on PORT " + port);

// });
console.log("");
console.log(
  "====================================END START============================================"
);
console.log("");
module.exports = app;
