
const express = require('express');
const router = express.Router();
const logger = require("../logger/logger");
const User = require("../models/UserModel");
const mongoose = require("mongoose");
const fs = require("fs");

const {Storage} = require('@google-cloud/storage');


var admin = require("firebase-admin");
const uuid = require('uuid-v4');
const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })


 router.get("/updateAvatar", async function (req, res) {
  // make a query with the `findById()` function
  await User.findById(req.session.userid, function (err, user) { 
    if(err){
      logger.debug(err);
    }
    else if(user.photoURL){
      
        
        
        res.render("avatarform", { url: "accounts" , photoURL:user.photoURL});
       

        //check file exists and size of file before upload file to firebase storage
        let fileName =user.photoURL;
       

    }else{
      let fileName = "/public/data/uploads/gratitudetoday-avatar.png";
       res.render("avatarform", { url: "accounts" , photoURL:"/data/uploads/gratitudetoday-avatar.png"});
    }


  });
  

  });
// router.post('/upload', function (req, res, next) {
    
//   try{
//     const form = formidable({ multiples: false });
    
//     // var json = JSON.parse(data);
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         next(err);
//         return;
//       }
      
//       logger.debug("original : "+files.file.originalFilename)
//       logger.debug("path : "+files.file.filepath)
//       logger.debug("new name : "+files.file.newFilename)
//       logger.debug("new name : "+files.file.mimetype)

//       //rename file for upload
//       const newAvatarFile = files.file.filepath+"\\"+files.file.newFilename
//       logger.debug(newAvatarFile);
//       const options = {
//         destination: newAvatarFile,
//         validation: 'crc32c',
//         metadata: {
//           metadata: {
//             event:"Adrian's Avatar",
//             firebaseStorageDownloadTokens: uuid,
//           }
//         }
//       };
//       storageBucket = admin.storage().bucket();
//       storageBucket.upload(newAvatarFile, options, function(err, file) {
//         if(!err){
//           //store in DB for profile
//           console.log("https://firebasestorage.googleapis.com/v0/b/" + storageBucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media");
          
          
//         }else{
//           console.log("ERROR: "+err) 
//         }
//       });
      
//       // res.json({ fields, files });
//     });
//   }catch(err){
//     logger.error(err) 
// }
// });
const path = require("path");
router.post('/upload', upload.single('avatar'), function (req, res, next) {

  const dbAvatarFile=req.file.destination+req.file.filename;
  logger.debug("dbAvatarFile: "+dbAvatarFile)
 try{ 
  const db = dbAvatarFile.substring(8, dbAvatarFile.length);
  
  
 
  //update user photoURL
    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.session.userid)}, {$set: {photoURL:db}}, {new: true}, (err, doc) => {
          if (err) {
              logger.error(err.message);
              //render to error page
              res.send(JSON.stringify("failed"))
              res.render("avatarform", { url: "accounts" , photoURL:db});
            }
            else{
              // res.render('hometwitter', {feedId, feedTitle})
            
              res.render("avatarform", { url: "accounts" , photoURL:db});
              
              
          }
    })
  }
  catch(e){
    logger.error(e)
  }
  //upload to firebase?

 const storage = new Storage({
    keyFilename: "./gratiudetoday---dev-firebase-adminsdk-4ltua-772bc6cf6b.json",
 });
  let bucketName = "gs://gratiudetoday---dev"
  //get directory from path
  let filename = '/home/ade/repos/gratitudetoday/public/data/uploads/2846090142d0d6882578d60a77091532';
  
});
  
 
  
  
  // // console.log(file.type);
  // console.log(file.destination);
  // User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.session.userid)}, {$set: {photoURL:req.files.avatar.}}, {new: true}, (err, doc) => {
    //       if (err) {
    //           logger.error(err.message);
    //           //render to error page
    //           res.send(JSON.stringify("failed"))
    //           res.render("avatarform", { url: "accounts" , photoURL:imgURL});
    //         }
    //         else{
    //           // res.render('hometwitter', {feedId, feedTitle})
            
    //           res.render("avatarform", { url: "accounts" , photoURL:imgURL});
              
              
    //       }
    //     })
 
  
// });
module.exports = router;