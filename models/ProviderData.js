var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Schema = Schema({
         user: { 
             type: Schema.Types.ObjectId
            , ref: 'users' },
        
        uid: { type: String, required: true },
        uproviderIdid: { type: String, required: true },
        displayName: {type: String, default:""},
        photoURL: {type: String, default:""},
        email: {type: String, default:""},
        phoneNumber: {type: String, default:""},
        createDate: {
            type: Date,
            default: Date.now
        }
});
// "uid": "104978327686880030809",
//       "displayName": "Adrian Nadeau",
//       "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GgNi8lj9MKCq-KIGud_yEpmTYNqCECSpH8gcOPj2A=s96-c",
//       "email": "adriannadeau.art@gmail.com",
//       "phoneNumber": null,
//       "providerId": "google.com"
module.exports = mongoose.model('Post', PostSchema);
