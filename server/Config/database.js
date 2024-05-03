const mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.URL;
exports.database = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        
    })
        .then(() => { console.log('DATABASE CONNECTED') })
    .catch((e) => {
            console.log("Error in db connection");
            console.log(e);
        })
}

