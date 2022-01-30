var express = require("express"),
  router = express.Router(),
  logger = require("../logger/logger"),
  User = require("../models/UserModel"),
  mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { SENDGRID_API_KEY } = require("../config.js");
router.use(express.json());

router.get("/", function (req, res) {
  res.render("loginpage", { url: "home" });
});

router.get("/resetForm", function (req, res) {
  res.render("resetpassword", { url: "home" });
});

router.get("/sendRestForm", function (req, res) {
  res.render("resetemail", { url: "home" });
});

//////////////////
////LOGIN USER////
//////////////////
router.post(
  "/",
  [
    // Validate fields
    check("email").isEmail().withMessage("Email must be valid and entered"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be entered and at least 6 characters"),
  ],
  (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      logger.error("validation errors");
      req.session.email = email;
      res.status(422).json({ errors: errors.array() });
    }
  }
);

///////////////////////////////
////SEND EMAIL Password Reset//
///////////////////////////////
router.post(
  "/sendReset",
  [
    // Validate fields

    check("email").isEmail().withMessage("Email must be valid and entered"),
  ],
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    var host = req.get("host");
    const errors = validationResult(req);
    logger.error("errors: " + errors);
    if (!errors.isEmpty()) {
      logger.error("validation failed");
      return res.status(422).json({ errors: errors.array() });
    } else {
      const email = req.body.email;
      let query = { email: email };
      const user = User.findOne(query, function (err, user) {
        if (!user) {
          const error = new Error("Unable to find email address");
          res.status(500);
          return res.send(JSON.stringify(error.message));
        } else {
          //send activation email
          logger.debug("send reset password email");
          var url = "http://" + host + "/users/login/resetForm/?id=" + user.id;

          logger.debug("url: " + url);
          const sgMail = require("@sendgrid/mail");
          sgMail.setApiKey(SENDGRID_API_KEY);
          const msg = {
            to: user.email,
            from: "GratitudeToday <adrian@adriannadeau.com>",
            templateId: "d-c160d54ee1624aa3aa555173d6314d9d",
            dynamic_template_data: {
              subject: "GratitudeToday Reset Password",
              name: user.firstname,
              url: url,
            },
          };

          sgMail.send(msg, function (err, email) {
            if (err) {
              logger.error("Mail issue (proxy)");
              const error = new Error("System error, please try again later");
              res.send(JSON.stringify(error.message));
            } else {
              res.send(user);
            }
          });
        }
      });
    }
  }
);
router.post(
  "/resetPassword/:id",
  [
    // Validate fields
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be entered and at least 6 characters"),
    check("confirmpassword")
      .isLength({ min: 6 })
      .withMessage(
        "Confirm Password must be entered and at least 6 characters"
      ),
  ],
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions

    const errors = validationResult(req);
    logger.error("errors: " + errors);
    if (!errors.isEmpty()) {
      logger.error("validation failed");
      return res.status(422).json({ errors: errors.array() });
    } else {
      logger.debug("reset account" + req.params.id);
      var pwd = req.body.password;
      var confirmPwd = req.body.confirmpassword;

      if (pwd != confirmPwd) {
        //send back error
        logger.error("passwords don't match");
        const error = new Error("Passwords must match");
        res.status(430);
        return res.send(JSON.stringify(error.message));
      }
      logger.debug("reset account" + req.params.id);
      var pwd = req.body.password;
      var confirmPwd = req.body.confirmpassword;

      if (pwd != confirmPwd) {
        //send back error
        logger.error("passwords don't match");
        const error = new Error("Passwords must match");
        res.status(430);
        return res.send(JSON.stringify(error.message));
      } else {
        //continue on
        bcrypt.genSalt(10, function (err, salt) {
          if (err) {
            logger.error("BCrype issue");
            const error = new Error("Unable to reset password?");
            //throw new Error('User email account already exists.');
            res.status(420);
            res.send(JSON.stringify(error.message));
          }
          bcrypt.hash(pwd, salt, function (err, hash) {
            User.findOneAndUpdate(
              { _id: mongoose.Types.ObjectId(req.body._id) },
              { $set: { password: hash } },
              { new: true },
              (err, doc) => {
                if (err) {
                  logger.error("Something wrong updating password");
                  res.send(JSON.stringify(err.message));
                } else {
                  res.send(JSON.stringify(hash));
                }
              }
            );
          });
        });
      }
    }
  }
);
module.exports = router;
