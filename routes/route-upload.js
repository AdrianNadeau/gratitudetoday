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

 
logger.debug("set creds");
 const AWS = require('aws-sdk');
 const UUID = require('uuid/v4');
 const Busboy = require('busboy');
 AWS.config.update({ accessKeyId: "AKIA37SVVXBHZG7RHHXQ", secretAccessKey: "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", region:"us-east-1" });
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
     // Load the SDK for JavaScript
    var AWS = require('aws-sdk');
    // Set the Region 
    AWS.config.update({region: 'us-east-1'});

    // Create S3 service object
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
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

// const express = require("express");
// const router = express.Router();
// var fs = require('fs');
// logger = require("../logger/logger"),
// router.use(express.json());
// var AWS = require('aws-sdk');

// router.post("/updateAvatar", function (req, res) {
//     // Load the AWS SDK for Node.js
//     logger.debug("upload avatar")
//     // Set the region 
//     AWS.config.update({region: process.env.REGION});
//     logger.debug("region")
//     // Create S3 service object
//     var s3 = new AWS.S3({apiVersion: '2006-03-01'});
//     logger.debug("api")
//     // call S3 to retrieve upload file to specified bucket
//     var uploadParams = {Bucket: process.env.BUCKET_NAME, Key: '', Body: ''};
//     var file = '/home/adrian/repos/gratitudetoday/README.md';
//     logger.debug("file"+file)

// // Configure the file stream and obtain the upload parameters
    
//     var fileStream = fs.createReadStream(file);
//     fileStream.on('error', function(err) {
//     console.log('File Error', err);
// }); 
//     uploadParams.Body = fileStream;
//     uploadParams.Key = path.basename(file);

//     // call S3 to retrieve upload file to specified bucket
//     s3.upload (uploadParams, function (err, data) {
//     if (err) {
//         console.log("Error", err);
//     } if (data) {
//         console.log("Upload Success", data.Location);
//     }
//     });
// //     AWS.config.update({region: process.env.REGION});
// //     // Create S3 service object
// //     s3 = new AWS.S3({apiVersion: '2006-03-01'});

// //     // Call S3 to list the buckets
// //     s3.listBuckets(function(err, data) {
// //     if (err) {
// //         console.log("Error", err);
// //     } else {
// //         console.log("Success", data.Buckets);
// //     }
// // });

// });
// module.exports = router;