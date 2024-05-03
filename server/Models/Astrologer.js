const mongoose = require('mongoose');

const Astrologer = new mongoose.Schema({
    Aboutme: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    occupation: {
        type: String,
        required:true
    }

});
module.exports = mongoose.model("Astrologer", Astrologer);