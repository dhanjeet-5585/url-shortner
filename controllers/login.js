const User = require('../models/signup.js')

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
async function ValidateUser (req,res){
    const userdata = req.body ; 
    // console.log(userdata);
    const user_credentials = await User.findOne({email : userdata.email});
    if(!user_credentials) {
        return res.status(400).json({err : 'User not found'})
    }
    if(user_credentials.password != userdata.password){
        return res.status(400).json({err: 'User credentials do not match'})
    }
    const payload = {
        '_id' : user_credentials._id,
        'email' : user_credentials.email,
        'username' : user_credentials.username,
    }
    const token = jwt.sign(payload, jwtSecret,{
        expiresIn: '15m'
    })

    return res.status(200)
            .cookie("uid", token, { httpOnly: true }) // httpOnly is recommended for security
            .json({ message: "Login successful" });


}

module.exports = {
    ValidateUser
}