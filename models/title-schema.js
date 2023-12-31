const mongoose = require("mongoose")
const titleSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        uppercase:true,

    },
    budget:{
        type:Number,
        required:true,
        unique:true
    },
    color:{
        type:"String",
        validate: {
            validator: function(value) {
              // Using a regular expression to check if the value is a valid hexadecimal color code
              return /^#([A-Fa-f0-9]{6})$/.test(value);
            },
            message: 'Color code must be a valid hexadecimal color code (e.g., "#FFC0CB").'
        },
        required:true,
        trim:true,
        uppercase:true
    }
},{collection:'newcollection'})
module.exports = mongoose.model('title',titleSchema)