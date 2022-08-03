var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Journal = require('../models/JourneyModel');

const UserSchema = new mongoose.Schema({
    accessToken:{ type:  String},
    email: {type:String, required: true, unique: true },
    url: {type:String},
    displayName:{ type:  String, required: true },
    photoURL:{ type:  String },
    public: {type:Boolean,default:false},
    emailVerified: {type:Boolean,default:false},
    location: { type:  String,default:""},
    bio: { type:  String,default:""},
    providers: [{ type: Schema.Types.ObjectId, ref: 'ProviderData' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    location: { type:  String,default:""},
    activated: {type:Boolean,default:false},
    journey_id: {type:Number,required: true,default:0},
    happiness:{type: Number, default:3}, 
    exp_id: {type:Number,required: true,default:0}, 
    schedule: {type:Number,required: true,default:0}, 
    displayOnBoard:{type:Boolean,required: true,default:true},
    recieveEmail: {type:Boolean,required: true,default:true},
     createDate: {
        type: Date,
        default: Date.now
    }
    ,lastloggedInDate: {
        type: Date,
        default: Date.now
    }
});


 module.exports = mongoose.model('users', UserSchema);