const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app (production build)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB Atlas connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

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
    }
});

const Contact = mongoose.model('Contact', contactSchema);

// API Routes

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
app.get('/api/contacts', async (req, res) => {
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
app.delete('/api/contact/:id', async (req, res) => {
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

// Catch-all route: serve React app for any other routes (must be after API routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
