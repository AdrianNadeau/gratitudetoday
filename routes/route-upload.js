/**
 * we are going to upload file to s3 via node js by using
 * aws-sdk - required
 * busboy -  required
 * uuid - optional - for image renaming purpose
 * with this library you can upload any kind of file to s3 via node js.
 */
 var express = require("express"),
 router = express.Router(),
 logger = require("../logger/logger"),
 multer = require("multer");
(User = require("../models/UserModel")),
 (Post = require("../models/PostModel")),
 (mongoose = require("mongoose")),
 (bcrypt = require("bcryptjs"));
 const AWS = require('aws-sdk');
 const UUID = require('uuid/v4');
const S3 = new AWS.S3();
 
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
 router.post("/upload", (req, res) => {
   logger.debug("UPLOAD");
  var params = {Bucket: 'gratitudetoday', Key: 'key', Body: stream};
  s3.upload(params, function(err, data) {
    console.log(err, data);
  });
  console.log("data:"+data)
  //  logger.debug("upload image:"+req.params.userId);
  // var buf = Buffer.from(req.body.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64')
  // logger.debug('buf: '+buf);
  // var data = {
  //   Key: req.body.userId, 
  //   Body: buf,
  //   ContentEncoding: 'base64',
  //   ContentType: 'image/jpeg'
  // };
  // logger.debug('data: '+data);
  // s3Bucket.putObject(data, function(err, data){
  //     if (err) { 
  //       console.log(err);
  //       console.log('Error uploading data: ', data); 
  //     } else {
  //       console.log('successfully uploaded the image!');
  //     }
  // });
    // AWS.config.getCredentials(function(err) {
    //     if (err) console.log(err.stack);
    //     // credentials not loaded
    //     else {
    //       logger.debug("Access key:", AWS.config.credentials.accessKeyId);
    //     }
    //   });
      
      
    //  let chunks = [], fname, ftype, fEncoding;
    //  let busboy = new Busboy({ headers: req.headers });
    //  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    //     fieldname="/public/avatars/"+filename;
    //      logger.debug('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    //      fname = "fname= "+filename.replace(/ /g,"_");
    //      ftype = mimetype;
    //      fEncoding = encoding;
    //      file.on('data', function(data) {
    //          // you will get chunks here will pull all chunk to an array and later concat it.
    //          logger.debug(chunks.length);
    //          chunks.push(data)
    //      });
    //      file.on('end', function() {
    //         logger.debug('File [' + filename + '] Finished');
    //      });
    //  });
    //  busboy.on('finish', function() {
    //     logger.debug("in busboy")
        
    //      const userId = UUID();
    //      logger.debug(userId)
    //      const params = {
    //          Bucket: process.env.BUCKET_NAME, // your s3 bucket name
    //          Key: `${userId}-${fname}`, 
    //          Body: Buffer.concat(chunks), // concatinating all chunks
    //          ACL: 'public-read',
    //          ContentEncoding: fEncoding, // optional
    //          ContentType: ftype // required
    //      }
    //      logger.debug("past params");
    //      // we are sending buffer data to s3.
    //      S3.upload(params, (err, s3res) => {
    //          if (err){
    //              logger.debug("error: "+err)
    //            res.send({err, status: 'error'});
    //          } else {
    //            res.send({data:s3res, status: 'success', msg: 'Image successfully uploaded.'});
    //          }
    //      });
         
    //  });
    //  req.pipe(busboy);
 });



module.exports = router;