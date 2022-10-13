var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var PostSchema = Schema({
         user: { 
             type: Schema.Types.ObjectId
            , ref: 'users' },
        
        postMsg: { type: String, required: true },
        postMediaType: {type: String, default:""},
        postMedia: {type: String, default:""},
        happiness:{type: Number, default:3},
        public: { type: Boolean },
        createDate: {
            type: Date,
            default: Date.now
        }
});
module.exports = mongoose.model('Post', PostSchema);
