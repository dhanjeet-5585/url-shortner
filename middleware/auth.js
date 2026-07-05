const jwt = require('jsonwebtoken');
require('dotenv').config({ path: "D:/url shortner/backend/.env" });
const jwtSecret = process.env.JWT_SECRET;

function checkForAuthentication(req, res, next) {
    const token = req.cookies?.uid;

    if (!token) {
        // No token found, user is unauthorized
        return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    try {
        // This validates the signature. If a user tampers with the cookie, this throws an error!
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; // Attach user details to the request object
        next(); // Proceed to the next route/handler
    } catch (err) {
        // Token was modified or expired
        // return res.status(401).json({ error: "Invalid or expired session. Please log in again." });
        return res.status(401).send(`
            <script>
                alert("Please Login to Access this");
                window.location.href = "/login.html";
            </script>
        `);
        
    }
}

module.exports = { checkForAuthentication };