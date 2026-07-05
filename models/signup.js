const mongoose = require('mongoose')

const SignUpSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,

    }
}, {timestamp:true});

const UserData = mongoose.model('userdata', SignUpSchema);

module.exports = UserData;