const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')

const app = express()
// Setup your S3 bucket here
const s3 = new AWS.S3({});


const upload = multer({
  storage: multerS3({
    s3: s3, // Can be used with shorthand expression
    bucket: 'gratitudetodayuploader-s3uploadbucket-1rk0adqwq7xiz', // Your bucket name goes here
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
      // The metadata you want to send.
    },
    acl: 'public-read', // Optional ACL
    key: function (req, file, cb) {
      cb(null, Date.now().toString()) // Either return a new unique value or use date as uuid 
      // Be sure to add + ".your_file_extension" since it will not be automatically added.
    },
    contentType: multerS3.AUTO_CONTENT_TYPE // If you want multer to detect automatically
    // Else The optional contentType option can be used to set Content/mime type of the file. By default the content type is set to application/octet-stream
  })
})

app.post('/upload', upload.single('your-field-key'), function(req, res, next) {
  res.send('Successfully uploaded ' + req.files.length + ' files!')
})
