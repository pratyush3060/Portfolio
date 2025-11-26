import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`${API_BASE_URL}/api/contacts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setContacts(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const token = localStorage.getItem('adminToken');
                await axios.delete(`${API_BASE_URL}/api/contact/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setContacts(contacts.filter(contact => contact._id !== id));
            } catch (error) {
                console.error('Error deleting contact:', error);
                alert('Failed to delete message');
            }
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE_URL}/api/contact/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContacts(contacts.map(contact =>
                contact._id === id ? { ...contact, isRead: true } : contact
            ));
        } catch (error) {
            console.error('Error updating contact:', error);
            alert('Failed to update status');
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="admin-page">
            <div className="container py-5">
                <div className="admin-header mb-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="admin-title">Admin Dashboard</h1>
                            <p className="admin-subtitle">Manage Contact Form Submissions</p>
                        </div>
                        <button onClick={() => navigate('/')} className="btn-back">
                            <i className="bi bi-arrow-left"></i>
                            Back to Portfolio
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-large"></div>
                        <p className="mt-3">Loading contacts...</p>
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="empty-state">
                        <i className="bi bi-inbox"></i>
                        <h3>No messages yet</h3>
                        <p>Contact form submissions will appear here</p>
                    </div>
                ) : (
                    <div className="contacts-grid">
                        {contacts.map((contact) => (
                            <div key={contact._id} className={`contact-card-admin ${contact.isRead ? 'read' : 'unread'}`} style={{ opacity: contact.isRead ? 0.7 : 1 }}>
                                <div className="contact-header-admin">
                                    <div>
                                        <h4>{contact.name}</h4>
                                        <p className="contact-date">{formatDate(contact.createdAt)}</p>
                                    </div>
                                    <button
                                        onClick={() => handleMarkAsRead(contact._id)}
                                        className="btn-action me-2"
                                        title="Mark as Read"
                                        style={{ background: 'none', border: 'none', color: '#4facfe' }}
                                    >
                                        <i className={`bi ${contact.isRead ? 'bi-envelope-open' : 'bi-envelope'}`}></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="btn-delete"
                                        title="Delete"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>

                                <div className="contact-info-admin">
                                    <div className="info-item">
                                        <i className="bi bi-envelope"></i>
                                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                    </div>
                                    <div className="info-item">
                                        <i className="bi bi-telephone"></i>
                                        <a href={`tel:${contact.mobile}`}>{contact.mobile}</a>
                                    </div>
                                </div>

                                <div className="contact-message-admin">
                                    <strong>Message:</strong>
                                    <p>{contact.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="admin-stats">
                    <div className="stat-card">
                        <i className="bi bi-envelope-open"></i>
                        <div>
                            <h3>{contacts.length}</h3>
                            <p>Total Messages</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
