
const express = require('express');
const router = express.Router();
const logger = require("../logger/logger");
const User = require("../models/UserModel");
const mongoose = require("mongoose");
  
 router.get("/updateAvatar", function (req, res) {
    res.render("avatarform", { url: "accounts" });
  });
  
  router.get("/updateError", function (req, res) {
    res.render("avatarError", { url: "accounts" });
  });
  router.get("/uploadsuccess", function (req, res) {
    
  });
 

  router.post("/upload",async function (req, res) {
    
    let fileName = req.files.file;
    logger.debug("FILENAME: "+fileName)
  });

   
module.exports = router;