const URL_COLLECTION = require('../models/url'); // Imported as URL_COLLECTION

async function DeleteUserUrl(req, res) {
    try {
        const urlId = req.params.id;
        const userId = req.user.email; 

        // Use the matching variable name 'URL_COLLECTION' here
        // Ensure you query by '_id' if your frontend passes 'item._id', or 'shortId' if it passes 'item.shortId'
        const deletedUrl = await URL_COLLECTION.findOneAndDelete({ 
            shortId: urlId, 
            createdBy: userId 
        });

        if (!deletedUrl) {
            // Return JSON consistently so frontend parsing doesn't break
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { DeleteUserUrl };