const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const signupUrl = require('./routes/signup.js');
const { handleID } = require('./controllers/url.js');
const loginurl = require('./routes/login.js');
const cookieParser = require('cookie-parser');
const path = require('path');
const signoutURL = require('./routes/signout.js')
const deleteURL = require('./routes/deleteurl.js')
const cors = require("cors");
const URL_MODELS = require('./models/url.js')
const { checkForAuthentication } = require('./middleware/auth.js');

// require('dotenv').config({ path: "D:/url shortner/backend/.env" });
require("dotenv").config();
const { connectMongoDB } = require('./connection.js');
const URL = require('./models/url');

// 1. Core Request & Cookie Parsing Middleware (MUST RUN FIRST)
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// 2. PROTECTED ROUTES (Check auth BEFORE matching any static files)
app.get('/dashboard.html', checkForAuthentication, (req, res) => {
    // Sends the secure dashboard file from your separate private directory
    res.sendFile(path.join(__dirname, 'private', 'dashboard.html'));
});

app.get('/api/username', checkForAuthentication, (req, res) => {
    // Correct way to fetch the username attached by the middleware
    if (req.user && req.user.username) {
        return res.status(200).json({ username: req.user.username });
    }
    
    return res.status(400).json({ error: "Username not found in session token" });
});

// 3. STATIC FILES & ROOT ASSETS (For public access)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// 1. Added the leading slash
app.get('/api/my-urls', checkForAuthentication, async (req, res) => {
    try {
        // 2. Extracted the correct unique identifier from the JWT payload
        // (Make sure this matches what you put in your jwt.sign() when logging in)
        const userId = req.user.id || req.user.email; 

        // 3. Used .find() instead of findOne, and added 'await'
        // 4. Queried the schema using 'createdBy' to match your Mongoose structure
        const user_urls = await URL_MODELS.find({ createdBy: userId });
        
        // Returns an array of URL objects: [{ shortId: "...", redirectedUrl: "..." }]
        res.status(200).json(user_urls);
    } catch (err) {
        console.error("Error fetching user URLs:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});



// 4. API & Dynamic Router Routes
app.use('/url', checkForAuthentication, urlRoute);
app.use('/api/signout', checkForAuthentication, signoutURL);
app.use('/api/myurls', deleteURL);

app.use('/login', loginurl);
app.use('/signup', signupUrl);
app.use('/:shortID', handleID);

const PORT = process.env.PORT || 8000;
// connectMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("MongoDB Connected!.."));

connectMongoDB(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected!.."))
    .catch(err => console.error("MongoDB Error:", err));

app.listen(PORT, () => { console.log('Server is running on port 8000') });