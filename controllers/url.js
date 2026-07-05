const shortid = require('shortid')
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'Url is required' });
    }

    const shortID = shortid(8);
    await URL.create({
        shortId: shortID,
        redirectedUrl: body.url,
        createdBy: req.user.email,
    });

    // 1. Get the current host (e.g., 'localhost:8000' or 'your-app.onrender.com')
    const host = req.get('host');

    // 2. Render uses HTTPS proxies, so we check if 'x-forwarded-proto' header exists,
    // fallback to req.protocol for local testing.
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;

    // 3. Dynamically assemble the full URL string
    return res.json({
        success: true,
        shortURL: `${protocol}://${host}/${shortID}`
    });
}

async function handleID(req, res) {
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
        { returnDocument: "after" }
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