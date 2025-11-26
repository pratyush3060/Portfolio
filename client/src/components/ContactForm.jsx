import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('http://localhost:5000/api/contact', formData);

            if (response.data.success) {
                setStatus({ type: 'success', message: response.data.message });
                setFormData({ name: '', email: '', mobile: '', message: '' });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to send message. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                required
                                placeholder="Your Name"
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                                placeholder="your.email@example.com"
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile *</label>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="form-control"
                                required
                                placeholder="+91 XXXXXXXXXX"
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="form-control"
                                rows="5"
                                required
                                placeholder="Your message here..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-send-fill"></i>
                                    Send Message
                                </>
                            )}
                        </button>
                    </div>

                    {status.message && (
                        <div className="col-12">
                            <div className={`alert alert-${status.type}`}>
                                {status.type === 'success' ? (
                                    <i className="bi bi-check-circle-fill"></i>
                                ) : (
                                    <i className="bi bi-exclamation-circle-fill"></i>
                                )}
                                {status.message}
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
