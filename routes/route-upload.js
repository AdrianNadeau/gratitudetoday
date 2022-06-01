
const express = require('express');
const router = express.Router();
const logger = require("../logger/logger");
const User = require("../models/UserModel");
const mongoose = require("mongoose");

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");


const s3 = new aws.S3();

 /**
  * route where we get multipart form data
  * capture file and upload files to s3
  * 
  */
  router.get("/updateAvatar", function (req, res) {
    res.render("avatarform", { url: "accounts" });
  });
  
  router.get("/updateError", function (req, res) {
    res.render("avatarError", { url: "accounts" });
  });
 
  const upload = require("../uploads/uploader");
  const singleUpload = upload.single("image");
  //userId is the param

  router.post("/upload",async function (req, res) {
    
    
    var app = express()
    
    
    var upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: 'some-bucket',
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          cb(null, Date.now().toString())
        }
      })
    })
    
    app.post('/upload', upload.array('photos', 3), function(req, res, next) {
      res.send('Successfully uploaded ' + req.files.length + ' files!')
    })
  });
module.exports = router;