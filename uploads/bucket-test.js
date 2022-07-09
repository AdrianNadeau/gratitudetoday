// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
// var serviceAccount = require("C:/anadeau/gratiudetoday---dev-firebase-adminsdk-4ltua-05f07d2bf1.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "gs://gratiudetoday---dev.appspot.com"
// });
// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html

// Creates a client using Application Default Credentials
// const storage = new Storage();

// Creates a client from a Google service account key
const storage = new Storage({keyFilename: 'C:/anadeau/gratiudetoday---dev-firebase-adminsdk-4ltua-05f07d2bf1.json'});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
const bucketName = 'adriannadeaupics';
console.log(bucketName)

async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
}

createBucket().catch(console.error);
