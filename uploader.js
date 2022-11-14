// const {Storage} = require('@google-cloud/storage');
// const express = require("express");

// const app = new express();


// const storage = new Storage({
//     keyFilename: "./gratiudetoday---dev-firebase-adminsdk-4ltua-772bc6cf6b.json",
//  });

// let bucketName = "gs://gratiudetoday---dev"

// let filename = '/home/ade/repos/gratitudetoday/public/data/uploads/2846090142d0d6882578d60a77091532';

// // Testing out upload of file
// const uploadFile = async() => {

//     // Uploads a local file to the bucket
//     await storage.bucket(bucketName).upload(filename, {
//         // Support for HTTP requests made with `Accept-Encoding: gzip`
//         gzip: true,
//         // By setting the option `destination`, you can change the name of the
//         // object you are uploading to a bucket.
//         metadata: {
//             // Enable long-lived HTTP caching headers
//             // Use only if the contents of the file will never change
//             // (If the contents will change, use cacheControl: 'no-cache')
//             cacheControl: 'public, max-age=31536000',
//         },
// });

// console.log(`${filename} uploaded to ${bucketName}.`);
// }

// uploadFile();

// app.listen(process.env.PORT || 8088, () => { console.log('node server running');})