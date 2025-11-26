# Pratyush Tripathi - Portfolio

Professional portfolio website with contact form and admin dashboard.

## 📁 Project Structure

```
Pratyush_Tripathi_Portfolio/
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Portfolio.jsx  # Main portfolio page
│   │   │   ├── ContactForm.jsx # Contact form
│   │   │   └── Admin.jsx      # Admin dashboard
│   │   ├── App.jsx            # Router setup
│   │   ├── App.css            # All styles
│   │   ├── main.jsx           # Entry point
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json           # Frontend dependencies
├── server/
│   └── server.js              # Express backend + MongoDB
├── .env                       # Environment variables
├── package.json               # Root dependencies & scripts
└── README.md
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Install all dependencies (root + client)
npm run install-all

# OR install separately:
npm install          # Backend dependencies
cd client && npm install  # Frontend dependencies
```

### 2. Configure MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create a cluster and get your connection string
3. Add connection string to `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=5000
   ```

### 3. Run the Application

**Option A: Run both frontend & backend together**
```bash
npm run dev
```

**Option B: Run separately in two terminals**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

### 4. Access the Application
- **Portfolio**: http://localhost:5173/
- **Admin Dashboard**: http://localhost:5173/admin
- **Backend API**: http://localhost:5000/

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both frontend and backend |
| `npm run client` | Run frontend only (port 5173) |
| `npm run server` | Run backend only (port 5000) |
| `npm run build` | Build frontend for production |
| `npm run install-all` | Install all dependencies |

## 🎯 Features

- ✨ Modern dark theme portfolio
- 📧 Contact form with MongoDB storage
- 👨‍💼 Admin dashboard to manage submissions
- 🎨 Responsive design with Bootstrap
- 🚀 Fast development with Vite
- 💾 MongoDB Atlas database integration

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- Bootstrap 5.3 (CDN)
- Google Fonts

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS
- dotenv

## 📖 Documentation

For detailed setup instructions, see [Setup Guide](./setup_guide.md)

## 📧 Contact

- **Email**: tpratyush0@gmail.com
- **Phone**: +91 9532533060
- **Location**: Lucknow, UP, India

## 📄 License

ISC
