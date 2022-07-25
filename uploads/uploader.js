const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

var admin = require("firebase-admin");
const uuid = require('uuid-v4');

// var serviceAccount = require("C:/anadeau/gratiudetoday---dev-firebase-adminsdk-4ltua-05f07d2bf1.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "gs://gratiudetoday---dev.appspot.com"
// });

//-
// It's not always that easy. You will likely want to specify the filename
// used when your new file lands in your bucket.
//
// You may also want to set metadata or customize other options.
//-
//get unique name for file
const newFileName = uuid();
//get file extension
console.log('filename: ')
let fileExtension = newFileName.substring(newFileName.length, newFileName.length-4);
console.log(fileExtension);
const options = {
  destination: 'avatar-'+newFileName+".jpg",
  validation: 'crc32c',
  metadata: {
    metadata: {
      event:"Adrian's Avatar",
      firebaseStorageDownloadTokens: uuid,
    }
  }
};
storageBucket = admin.storage().bucket();
storageBucket.upload('C:/anadeau/profile.jpg', options, function(err, file) {
  if(!err){
    //store in DB for profile
    console.log("https://firebasestorage.googleapis.com/v0/b/" + storageBucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media");
    
    
  }else{
    console.log("ERROR: "+err) 
  }
});