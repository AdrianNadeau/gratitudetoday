var express = require('express'),
    router = express.Router(),
    logger = require('../logger/logger'),
    // blacklistCheck = require('../blacklist/BlacklistChecker'),
    Post = require("../models/PostModel"),
    // User = require("../models/UserModel"),
    mongoose=require('mongoose');
    const fs = require('fs');

    const { check, validationResult } = require('express-validator'); 


///////////////////////
//// CREATE POST///////
///////////////////////
//creat post then associate user with that post

router.post('/', [
  // Validate fields
  check('postMsg').not().isEmpty()
  .withMessage("Post must be entered"), 
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions

  
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else{
      //add post 
      var publicYn = false;
      publicYn= req.body.public;
      var post = new Post({
                    user: req.body.id,
                    postMsg: req.body.postMsg,
                    postMediaType :  "",
                    postMedia :   "",
                    happiness : req.body.happiness,
                    public : publicYn
      });
      post.save(function (error, post) {
                  if (error){ 
                    logger.error(error.message);
                    res.send(error.message);
                    
                  }
                  
                  res.send(post)
      });
    }
    
});
///////////////////////
//// EDIT   POST///////
///////////////////////

router.post('/editPost/', async function(req,res){
  
  var publicYn = false;
  publicYn= req.body.public;
  if (!req.session.userid) {
     
      const error = new Error('Session Expired');
      res.status(405);
      res.send(JSON.stringify(error.message));
  }
  else{
    Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.postid)}, {$set: {
      postMsg: req.body.postMsg,
      happiness: req.body.happiness , 
      public : publicYn}}, (err, doc) => {
      if (err)
          logger.error(err.message);
      
      if(doc)
        res.send(JSON.stringify(doc))
    });
   
  } 
  });

///////////////////////
//// GET ALL POSTS ////
///////////////////////

router.get('/', function(req, res) {
  
  try{
      var q = Post.find({}).populate('user').sort({'createDate': -1});
      q.exec(function(err, posts) {
        if (err){ 
            logger.error(err.message);
            res.send(err.message);
            next();  
        }
        res.json(posts);
      })
  }
  catch(err){
    //no posts yet, load page anyway
    logger.error(err.message);
    res.send(err.message);
    next();  
  }
});
router.get('/userposts/', function(req, res) {
  //take date argument and get # of posts for that month
  //Also get number of happiness for that month and add pts for both. Round up if decimals.
  
    try{
     
        //return posts in decending order
        var q = Post.find({user: req.session.userid}).populate('user').sort({'createDate': -1});
          q.exec(function(err, posts) {
            if (err){ 
                logger.error(err.message);
                res.send(err.message);
                //next();  
            }
            
            res.json(posts);
          })
      }
   
    catch(err){
      //no posts yet, load page anyway
      logger.error(err.message);
      res.send(err.message);
      next();  
    }
  });
  router.get('/userpostscount/', function(req, res) {
    
    //take date argument and get # of posts for that month
  //   logger.debug('get posts');
  //  // Find episodes that aired on this exact date
  //   return Post.find({ createDate: new Date('2020-05-04') }).
  //     then(posts => {
  //       logger.debug(posts.length);
  //     })
  //    .catch(error => logger.error(error))
      // posts[0].postMsg; // "Where No One Has Gone Before"
      // // Find episodes within a range of dates, sorted by date ascending
      // return Post.find({ createDate: { $gte: '1987-10-19', $lte: '1987-10-26' } });
      // }).
      // then(posts => {
      //   posts[0].firstname; // "The Last Outpost"
      //   posts[1].lastname; // "Where No One Has Gone Before"
      // })
      
     
  //});
  
    var q = Post.find({user: req.session.userid}).populate('user').sort({'createDate': -1})
    q.exec(function(err, posts) {
              if (err){ 
                  logger.error(err.message);
                  res.send(err.message);
                  next();  
              }
              
              
              res.json(posts);
            })
          })
     

module.exports = router;
