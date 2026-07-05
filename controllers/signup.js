const UserData = require("../models/signup");

async function CreateNewUser(req, res) {
    try {
        const data = await UserData.create(req.body);

        return res.status(201).json({
            success: true,
            userdata: data,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

module.exports = { CreateNewUser };