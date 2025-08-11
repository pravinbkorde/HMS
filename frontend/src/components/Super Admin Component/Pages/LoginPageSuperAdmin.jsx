import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SuperAdminLogin.css';
import API from '../../../api';
import axios from 'axios';

export default function LoginPageSuperAdmin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(formData);

        try {
            const res = await API.post('patients/superadminlogin/', formData, {
                withCredentials: true,
            });

            console.log(res.data);

            // Save values in sessionStorage
            sessionStorage.setItem('access_token', res.data.access);
            sessionStorage.setItem('refresh_token', res.data.refresh);
            sessionStorage.setItem('username', res.data.username);
            sessionStorage.setItem('superadmin_id', res.data.superadmin_id);
            sessionStorage.setItem('role', res.data.role);
            console.log(`User role is ${res.data.role}`)

            // Optional: redirect or show success message
            navigate('/superadmin');

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Login failed:', error.response.data);
                alert(error.response.data.error)
                setIsLoading(false);
                // Show error to user here (toast, alert, etc.)
            }
        }

            setIsLoading(false);
        };

        return (
            <div className="login-page mt-5">
                <div className="container login-container">
                    <div className="row g-0 login-card">
                        <div className="col-md-6 login-banner">
                            <div className="text-center mb-4">
                                <i className="bi bi-hospital hospital-icon"></i>
                            </div>
                            <h2>Healthcare Admin Portal</h2>
                            <p>Access the super admin dashboard to manage hospital accounts, view analytics, and configure system settings.</p>
                        </div>
                        <div className="col-md-6 login-form">
                            <h3>Super Admin Login</h3>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label text-success fw-bold">Enter Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-success">
                                            <i className="bi bi-envelope"></i>
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control text-success"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label htmlFor="password" className="form-label text-success fw-bold">Enter Password</label>
                                        {/* <a href="/forgot-password" className="forgot-password">Forgot Password?</a> */}
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-text bg-success">
                                            <i className="bi bi-lock"></i>
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control text-success"
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* <div className="mb-4">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="rememberMe"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe">
                                            Remember me on this device
                                        </label>
                                    </div>
                                </div> */}

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Logging In...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                                Log In
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="text-center mt-4">
                                    <p className="text-muted">
                                        <i className="bi bi-shield-lock me-2 text-success"></i>
                                        <small className='text-success'>Protected by enterprise-grade security</small>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
