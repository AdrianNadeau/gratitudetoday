var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ExperienceSchema = Schema({
    id: {type: Number, default:""},
    title: { type: String, required: true }
});

module.exports = mongoose.model('Experience', ExperienceSchema);
