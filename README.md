# 🔗 URL Shortener

A full-stack URL Shortener web application built with **Node.js**, **Express.js**, **MongoDB Atlas**, and **Vanilla JavaScript**. Users can create an account, log in securely, generate short URLs, manage their links, and redirect using shortened URLs.

---

## 🚀 Live Demo

🌐 https://your-render-url.onrender.com

> Replace this with your Render deployment URL.

---

## ✨ Features

- 🔐 User Authentication (Signup/Login)
- 🍪 JWT Authentication using HTTP Cookies
- 🔗 Generate short URLs
- 📋 View all URLs created by the logged-in user
- 🗑️ Delete URLs
- 🚀 Redirect using short URLs
- ☁️ MongoDB Atlas cloud database
- 📱 Responsive and modern UI

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JSON Web Token (JWT)
- Cookie Parser
- bcrypt

---

## 📁 Project Structure

```
backend
│
├── controllers/
├── middleware/
├── models/
├── private/
├── public/
│   ├── css/
│   ├── index.html
│   ├── login.html
│   └── signup.html
│
├── routes/
├── connection.js
├── index.js
├── package.json
└── .gitignore
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/dhanjeet-5585/url-shortner.git
```

```bash
cd url-shortner
```

---

### Install dependencies

```bash
npm install
```

---

### Create a `.env` file

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Start the server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

## 📌 Environment Variables

| Variable | Description |
|----------|-------------|
| MONGO_URL | MongoDB Atlas connection string |
| JWT_SECRET | Secret key used to sign JWT tokens |



## 🔮 Future Improvements

- Custom short URLs
- QR Code generation
- Click analytics
- URL expiration
- Password-protected URLs
- Rate limiting
- Dark mode

---

## 👨‍💻 Author

**Dhanjeet Mishra**

GitHub:
https://github.com/dhanjeet-5585

LinkedIn:
(Add your LinkedIn profile)

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
