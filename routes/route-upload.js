var express = require("express"),
  router = express.Router(),
  logger = require("../logger/logger"),
  multer = require("multer");
(User = require("../models/UserModel")),
  (Post = require("../models/PostModel")),
  (mongoose = require("mongoose")),
  (bcrypt = require("bcryptjs"));

  const AWS = require('aws-sdk')
  AWS.config.update({ region: process.env.AWS_REGION })
  const s3 = new AWS.S3()
  const URL_EXPIRATION_SECONDS = 300
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
 
router.post("/upload", async (req, res) => {
  // Main Lambda entry point
  exports.handler = async (event) => {
    return await getUploadURL(event)
  }

  const getUploadURL = async function(event) {
    const randomID = parseInt(Math.random() * 10000000)
    const Key = `${randomID}.jpg`

    // Get signed URL from S3
    const s3Params = {
      Bucket: process.env.UploadBucket,
      Key,
      Expires: URL_EXPIRATION_SECONDS,
      ContentType: 'image/jpeg'
    }
    const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
    return JSON.stringify({
      uploadURL: uploadURL,
      Key
    })
  }

//  router.post("/upload", async (req, res) => {
//   var file = req.files.file;
//   const fileContent = fs.readFileSync(fileName)
  
//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: `${filename}.jpg`,
//     Body: fileContent
//   }
  
//   s3.upload(params, (err, data) => {
//     if (err) {
//       reject(err)
//     }
//     resolve(data.Location)
//   })
  // var file = req.files.form-control-file;
  // logger.debug("file :"+file);
  // fs.readFile(file.path, function (err, data) {
  //     if (err) 
  //       logger.error(err);
      
  //     else
  //       logger.debug(data);
  // });
  
  // var params = {Bucket: 'gratitudetodayuploader-s3uploadbucket-1rk0adqwq7xiz', Key: 'key', Body: stream,ACL: 'public-read'};
  // logger.debug("parmas: "+params)
  // await s3.upload(params, function(err, data) {
  //   if(err)
  //     logger.error(err);
  //     console.log("data:"+data)
  // });
  
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