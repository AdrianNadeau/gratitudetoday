var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Journal = require('../models/JourneyModel');
//this is the quote model for random quotes
const QuoteSchema = new mongoose.Schema({
    
    quote: {type:String, required: true},
    author:{ type:  String, required: true },
    
});


 module.exports = mongoose.model('quotes', QuoteSchema);