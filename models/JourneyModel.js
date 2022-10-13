var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var JourneySchema = Schema({
    journey_id: {type: Number, default:""},
    title: { type: String, required: true }
   
});

module.exports = mongoose.model('Journey', JourneySchema);
