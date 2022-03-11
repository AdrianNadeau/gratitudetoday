/* The following example creates a bucket. */

'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

var s3Bucket = new AWS.S3( { params: {Bucket: 'gratitudetoday'} } );

// const URL_EXPIRATION_SECONDS = 300
// const randomID = parseInt(Math.random() * 10000000)
// const Key = `${randomID}.jpg`
// var params = {
//       Bucket: "gratitudetoday",
//     // Key,
//     // Expires: URL_EXPIRATION_SECONDS,
//     ACL: 'public-read',
//     // ContentType: 'image/jpeg',
//  };
//  s3.createBucket(params, function(err, data) {
//    if (err) console.log(err, err.stack); // an error occurred
//    else     console.log(data);           // successful response
   /*
   data = {
    Location: "/examplebucket"
   }
   */

  //  const randomID = parseInt(Math.random() * 10000000)
   //   const Key = `${randomID}.jpg`
//  });

// /*
//   Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//   Permission is hereby granted, free of charge, to any person obtaining a copy of this
//   software and associated documentation files (the "Software"), to deal in the Software
//   without restriction, including without limitation the rights to use, copy, modify,
//   merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
//   permit persons to whom the Software is furnished to do so.
//   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
//   INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
//   PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
//   HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//   OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//   SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// */

// 'use strict'

// const AWS = require('aws-sdk')
// AWS.config.update({ region: process.env.AWS_REGION })
// const s3 = new AWS.S3()

// // Change this value to adjust the signed URL's expiration
// const URL_EXPIRATION_SECONDS = 300

// // Main Lambda entry point
// exports.handler = async (event) => {
//   return await getUploadURL(event)
// }

// const getUploadURL = async function(event) {
//   const randomID = parseInt(Math.random() * 10000000)
//   const Key = `${randomID}.jpg`

//   // Get signed URL from S3
//   const s3Params = {
//     Bucket: process.env.UploadBucket,
//     Key,
//     Expires: URL_EXPIRATION_SECONDS,
//     ACL: 'public-read',
//     ContentType: 'image/jpeg',

//     // This ACL makes the uploaded object publicly readable. You must also uncomment
//     // the extra permission for the Lambda function in the SAM template.

//     // ACL: 'public-read'
//   }

//   console.log('Params: ', s3Params)
//   const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

//   return JSON.stringify({
//     uploadURL: uploadURL,
//     Key
//   })
// }