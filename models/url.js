const mongoose = require("mongoose")


const UrlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required:true,
        unique: true,

    },
    redirectedUrl :{
        type : String,
        required : true,
    },
    createdBy : {
        type : String,
        required : true,
    },
   
});

const URL = mongoose.model("url",UrlSchema)

module.exports = URL