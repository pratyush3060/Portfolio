import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/login`, { passkey });
            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card bg-dark text-white border-secondary">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Admin Login</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label">Passkey</label>
                                    <input
                                        type="password"
                                        className="form-control bg-dark text-white border-secondary"
                                        value={passkey}
                                        onChange={(e) => setPasskey(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
