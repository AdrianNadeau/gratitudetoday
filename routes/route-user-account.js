var express = require("express"),
  router = express.Router(),
  logger = require("../logger/logger"),
  multer = require("multer");
(User = require("../models/UserModel")),
  (Post = require("../models/PostModel")),
  (mongoose = require("mongoose")),
  (bcrypt = require("bcryptjs"));
fs = require("fs");
path = require("path");
var randomstring = require("randomstring");
// const sharp = require('sharp');
require("firebase/auth");

var admin = require("firebase-admin");

const { check, validationResult } = require("express-validator");

router.use(express.json());

router.get("/info", function (req, res) {
  res.render("info", { url: "accounts" });
});

router.get("/changepassword", function (req, res) {
  res.render("accountresetpassword", { url: "accounts" });
});
router.get("/passwordupdated", function (req, res) {
  res.render("passwordupdated", { url: "accounts" });
});

router.get("/updateAvatar", function (req, res) {
  res.render("avatarform", { url: "accounts" });
});

router.get("/updateError", function (req, res) {
  res.render("avatarError", { url: "accounts" });
});

router.get("/exp", function (req, res) {
  res.render("experience", { url: "accounts" });
}); //schedule
// router.get('/schedule', function(req, res) {
//   res.render('schedule',{'url': 'accounts'});
// });
router.get("/create", function (req, res) {
  res.render("createjourney", { url: "accounts" });
});

router.get("/dashboard", function (req, res) {
  //get session value and check onboard flag
  res.render("dashboard", { url: "accounts" });
});

router.get("/account", function (req, res) {
  res.render("account", { url: "accounts" });
});
router.get("/contact", function (req, res) {
  res.render("contact", { url: "accounts" });
});

router.get("/contact", function (req, res) {
  res.render("contact", { url: "accounts" });
});
router.get("/progress", function (req, res) {
  res.render("progress", { url: "accounts" });
});
router.get("/myposts", function (req, res) {
  res.render("myposts", { url: "accounts" });
});
router.get("/getpost", function (req, res) {
  res.render("editpost", { url: "accounts" });
});
router.get("/getsharepost", function (req, res) {
  const userId = req.session.userid;
  res.render("sharepost", { url: userId ? "accounts" : "", userId });
});

router.get("/publicposts", function (req, res) {
  res.render("publicposts", { url: "accounts" });
});

router.get("/deletepost", function (req, res) {
  res.render("confirmdelete", { url: "accounts" });
});
router.get("/accountfriends", function (req, res) {
  res.render("accountfriends", { url: "accounts" });
});
router.get("/notifications", function (req, res) {
  res.render("notifications", { url: "accounts" });
});
router.get("/sharepost", function (req, res) {
  res.render("sharepost", { url: "accounts" });
});
router.get("/viewpost", function (req, res) {
  res.render("viewpost", { url: "accounts" });
});

// var randomFileName = randomstring.generate();
// var ext;

// const storage = multer.diskStorage({
// destination: (req, file, cb) => {

//   const dir = `./public/assets/img/avatars/`

//   fs.exists(dir, exist => {
//   if (!exist) {
//     return fs.mkdir(dir, error => cb(error, dir))
//   }
//   return cb(null, dir)
//   })
// },
// filename: (req, file, cb) => {
//   ext = file.originalname.split('.').pop();
//   cb(null, randomFileName+"."+ext)
// sharp(randomFileName+"."+ext)
//     .resize(300)
//     .toBuffer()
//     .then( data => {
//         //save to

//     })
//     .catch( err => { });
//    }
// })

// const upload = multer({ storage })

//const upload = multer({dest: __dirname + 'public/assets/img/avatars'});
// router.post('/updateAvatar', upload.single('photo'), (req, res) => {

//     try{event.preventDefault();
//       if(req.file) {

//             User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.session.userid)}, {$set: {avatar:"/assets/img/avatars/"+randomFileName+"."+ext}}, {new: true}, (err, doc) => {
//               if (err) {
//                   logger.error(err.message);
//                   //render to error page
//                   res.render('avatarError',{'url': 'accounts'});
//                 }
//                 else{
//                   //res.send(JSON.stringify(doc))
//                   res.render('avatarform',{'url': 'accounts'});
//               }
//         });
//       }
//       else{
//         res.render('avatarError',{'url': 'accounts'});
//       }
//     }catch(err) {event.preventDefault();
//       res.render('avatarError',{'url': 'accounts'});
//     }

//   //}
// });

router.post("/updateAccount/", async function (req, res) {
  if (!req.session.userid) {
    const error = new Error("Session Expired");
    res.status(405);
    res.send(JSON.stringify(error.message));
  } else {
    let displayName = req.body.displayname;
    User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.id) },
      {
        $set: {
          displayName: displayName,
          bio: req.body.bio,
          location: req.body.location,
          url: req.body.url,
        },
      },
      { new: true },
      (err, doc) => {
        if (err) {
          logger.error(err.message);
        }

        res.send(JSON.stringify(doc));
      }
    );
  }
});
//get onboard value
router.get("/getOnboardFlag", function (req, res) {
  try {
    if (!req.session.userid) {
      //no session
      const error = new Error("Session Expired");
      res.status(405);
      res.send(JSON.stringify(error.message));
    } else {
      User.findById(req.session.userid, function (err, user) {
        if (err) {
          //return error page

          logger.error(err);
        } else {
          //send back post as json

          res.send(user);
        }
      });
    }
  } catch (error) {
    logger.error("ERROR: " + error);
  }
});
//get selected post - move to post router later?
router.get("/getpostdetails/:postid", function (req, res) {
  try {
    const post = Post.findById(req.params.postid, function (err, post) {
      if (err) {
        //return error page
        logger.error(err);
      } else {
        //send back post as json
        res.send(post);
      }
    });
  } catch (error) {
    logger.error("ERROR: " + error);
  }
});

router.get("/getnonsecuredetails/:postid", function (req, res) {
  //remove session for social sharing
  logger.debug("get data for : " + req.params.postid);
  req.session.destroy(function (err) {
    // cannot access session here
    try {
      const post = Post.findById(req.params.postid, function (err, post) {
        if (err) {
          //return error page
          logger.error(err);
        } else {
          //send back post as json
          // res.send(post)
          logger.debug("send post to view");
          //send to view post page

          res.redirect("/viewpost/" + req.params.postid);
        }
      });
    } catch (error) {
      logger.error("ERROR: " + error);
    }
  });
});

////////////////////
////UPDATE JOURNEY////
////////////////////
router.get("/updatejourney/:id", async function (req, res) {
  if (!req.session.userid) {
    const error = new Error("Session Expired");
    res.status(405);
    res.send(JSON.stringify(error.message));
  } else {
    var selectedValue = parseInt(req.params.id);
    if (selectedValue > 4) {
      logger.error("Value over 4!");
      const error = new Error("Invalid Journey");
      res.status(420);
      res.send(JSON.stringify(error.message));
    } else {
      const filter = { _id: req.session.userid };
      const update = { journey_id: req.params.id };
      User.findOneAndUpdate(filter, update).then((user) => {
        res.render("experience", { url: "accounts" });
      });
    }
  }
});

///////////////////
////UPDATE EXP ////
////////////////////
router.get("/updateexp/:id", async function (req, res) {
  logger.debug("update exp");
  if (!req.session.userid) {
    const error = new Error("Session Expired");
    res.status(405);
    res.send(JSON.stringify(error.message));
  } else {
    var selectedValue = parseInt(req.params.id);

    logger.debug("exp: " + selectedValue);
    if (selectedValue > 4) {
      logger.error("Value over 4!");
      const error = new Error("Not a valid exp number");

      res.send(JSON.stringify(error.message));
    } else {
      const filter = { _id: req.session.userid };
      const update = { exp_id: req.params.id };
      User.findOneAndUpdate(filter, update).then((user) => {
        res.render("createjourney", { url: "accounts" });
      });
    }
  }
});
////////////////////////
////UPDATE SCHEDULE ////
////////////////////////
router.get("/schedule/:id", async function (req, res) {
  if (!req.session.userid) {
    const error = new Error("Session Expired");
    res.status(405);
    res.send(JSON.stringify(error.message));
  } else {
    var selectedValue = parseInt(req.params.id);

    logger.debug("schedule: " + selectedValue);
    if (selectedValue > 4) {
      logger.error("Value over 4!");
      const error = new Error("Not a valid exp number");

      res.send(JSON.stringify(error.message));
    } else {
      const filter = { _id: req.session.userid };
      const update = { schedule: req.params.id };
      User.findOneAndUpdate(filter, update).then((user) => {
        logger.debug("update schedule");
        res.render("schedule", { url: "accounts" });
      });
    }
  }
});

////////////////////
//// GET 1 USER ////
////////////////////
router.get("/userInfo", function (req, res) {
  if (!req.session.userid) {
    const error = new Error("Session Expired");
    res.status(405);

    res.send(JSON.stringify(error.message));
  } else {
    const user = User.findById(req.session.userid, function (err, user) {
      if (err) {
        logger.error("Get User Error: " + err.message);
        res.send(err.message);
      }
      //get user data

      res.send(user);
    });
  }
});
router.post("/resetPassword/", async function (req, res) {
  //update Firebase record
  logger.debug("START GENERATE");
  const auth = getAuth();
  const user = firebase.auth().currentUser;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      logger.debug("sent to: " + email);
    })
    .catch((error) => {
      logger.error(error.code);
      logger.error(error.message);
    });
});

////////////////////
//// DELETE POST ////
////////////////////

router.get("/deletePost/:postid", async function (req, res) {
  try {
    await Post.deleteOne(
      { _id: mongoose.Types.ObjectId(req.params.postid) },
      function (err, post) {
        if (err) {
          //return error page

          logger.error(err);
        } else {
          //send back post as json

          res.send(post);
        }
      }
    );
  } catch (error) {
    logger.error("ERROR: " + error);
  }
});

module.exports = router;
