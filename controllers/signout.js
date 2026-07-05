async function SignOutUser (req,res){
    res.clearCookie("uid");
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}

module.exports = {
    SignOutUser,
}