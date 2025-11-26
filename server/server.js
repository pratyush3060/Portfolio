const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || 'admin123'; // Default fallback
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_change_me';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'https://pratyushtripathi.onrender.com',
    credentials: true
}));
app.use(express.json());

// Auth Middleware
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid token.' });
    }
};

// Serve static files from the React app (production build)
const clientBuildPath = path.join(__dirname, '../client/build');
console.log('Serving static files from:', clientBuildPath);
const fs = require('fs');
if (fs.existsSync(clientBuildPath)) {
    console.log('Client build directory exists');
    console.log('Contents:', fs.readdirSync(clientBuildPath));
} else {
    console.log('Client build directory does not exist');
}
app.use(express.static(clientBuildPath));

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URL);
        console.log('MongoDB Atlas connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

// Contact Schema

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

const Contact = mongoose.model('Contact', contactSchema);

// API Routes

// POST - Admin Login
app.post('/api/login', (req, res) => {
    const { passkey } = req.body;

    if (passkey === ADMIN_PASSKEY) {
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid passkey' });
    }
});

// POST - Submit contact form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;

        // Validation
        if (!name || !email || !mobile || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Create new contact
        const contact = new Contact({
            name,
            email,
            mobile,
            message
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Message sent successfully!'
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again.'
        });
    }
});

// GET - Fetch all contacts (for admin)
app.get('/api/contacts', authMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts'
        });
    }
});

// DELETE - Delete a contact (for admin)
app.delete('/api/contact/:id', authMiddleware, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact'
        });
    }
});

// PUT - Mark contact as read
app.put('/api/contact/:id', authMiddleware, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        res.status(200).json({
            success: true,
            data: contact,
            message: 'Marked as read'
        });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update contact'
        });
    }
});

// Debug route to list files
app.get('/debug-files', (req, res) => {
    const fs = require('fs');
    const clientBuildPath = path.join(__dirname, '../client/build');
    let output = `Build Path: ${clientBuildPath}\n\n`;

    try {
        if (fs.existsSync(clientBuildPath)) {
            output += 'Root contents:\n';
            const files = fs.readdirSync(clientBuildPath);
            output += files.join('\n') + '\n\n';

            const assetsPath = path.join(clientBuildPath, 'assets');
            if (fs.existsSync(assetsPath)) {
                output += 'Assets contents:\n';
                const assets = fs.readdirSync(assetsPath);
                output += assets.join('\n') + '\n';
            } else {
                output += 'Assets directory missing!\n';
            }
        } else {
            output += 'Build directory missing!\n';
        }
    } catch (err) {
        output += `Error: ${err.message}`;
    }

    res.type('text/plain').send(output);
});

// Catch-all handler: send back React's index.html file for client-side routing
// MUST be the last route defined
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
