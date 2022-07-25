
const express = require('express');
const router = express.Router();
const logger = require("../logger/logger");
// const uploader = require("../uploads/uploader");
const User = require("../models/UserModel");
const mongoose = require("mongoose");
const formidable = require("formidable");
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

var admin = require("firebase-admin");
const uuid = require('uuid-v4');


 router.get("/updateAvatar", function (req, res) {
    res.render("avatarform", { url: "accounts" });
  });
  
  router.get("/updateError", function (req, res) {
    res.render("avatarError", { url: "accounts" });
  }); 
  router.get("/uploadsuccess", function (req, res) {
    
  });
 
  router.post('/upload', function (req, res, next) {
    
    try{
      const form = formidable({ multiples: false });
      
      // var json = JSON.parse(data);
      form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        
        logger.debug("original : "+files.file.originalFilename)
        logger.debug("path : "+files.file.filepath)
        logger.debug("new name : "+files.file.newFilename)
        logger.debug("new name : "+files.file.mimetype)

        //rename file for upload
        const newAvatarFile = files.file.filepath+"\\"+files.file.newFilename
        logger.debug(newAvatarFile);
        const options = {
          destination: newAvatarFile,
          validation: 'crc32c',
          metadata: {
            metadata: {
              event:"Adrian's Avatar",
              firebaseStorageDownloadTokens: uuid,
            }
          }
        };
        storageBucket = admin.storage().bucket();
        storageBucket.upload(newAvatarFile, options, function(err, file) {
          if(!err){
            //store in DB for profile
            console.log("https://firebasestorage.googleapis.com/v0/b/" + storageBucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media");
            
            
          }else{
            console.log("ERROR: "+err) 
          }
        });
        
        // res.json({ fields, files });
      });
    }catch(err){
      logger.error(err) 
  } 
    // const notes = 'C:/anadeau/profile.jpg';

    // const fileDir = path.dirname(notes); // /users/joe
    // logger.debug(fileDir);
    // const  fileBase=path.basename(notes); // notes.txt
    // logger.debug(fileBase);
    // // logger.debug(path.basename);
    // const fileExt = path.extname(notes); // .txt
    // logger.debug(fileExt);

    //upload process
    

  });

   
module.exports = router;