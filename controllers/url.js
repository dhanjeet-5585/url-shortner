const shortid = require('shortid')
const URL = require('../models/url');
async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error : 'Url is required'})
    }
    const shortID = shortid(8);
    await URL.create({
        shortId : shortID,
        redirectedUrl : body.url,
        createdBy : req.user.email,
        
        
    });

    return res.json({
        success: true,
        shortURL: `http://localhost:8000/${shortID}`
    });


}

async function handleID (req, res)  {
    const entry = await URL.findOneAndUpdate(
        {
            shortId: req.params.shortID,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { returnDocument: "after"}
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    return res.redirect(entry.redirectedUrl);
}





module.exports = {
    handleGenerateNewShortURL,
    handleID
  

}