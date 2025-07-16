import React, { useEffect, useState } from 'react';
import API from '../../api'; // Axios instance

const DoctorManager = () => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        doctor_type: '',
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingDoctorId, setEditingDoctorId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchDoctors = async () => {
        const token = sessionStorage.getItem("access_token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
        const loggedInUsername = sessionStorage.getItem("username")
        try {
            const res = await API.get(`patients/doctors/by_user/${loggedInUsername}/`,config);
            setDoctors(res.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({
            username: '',
            password: '',
            doctor_type: '',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            address: ''
        });
        setIsEditing(false);
        setEditingDoctorId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("access_token");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        console.log(token)
        console.log(config)

        try {
            if (isEditing) {
                await API.put(`patients/doctors/${editingDoctorId}/update/`, formData, config);
            } else {
                await API.post('patients/doctors/create/', formData, config); // ✅ include config
            }
            resetForm();
            fetchDoctors();
        } catch (error) {
            console.error('Error saving doctor:', error.response?.data || error.message);
        }
    };


    const handleEdit = async (doctorId) => {
        try {
            const res = await API.get(`/doctors/${doctorId}/`);
            setFormData(res.data);
            setIsEditing(true);
            setEditingDoctorId(doctorId);
            setShowForm(true);
        } catch (error) {
            console.error('Error loading doctor:', error);
        }
    };

    const handleDelete = async (doctorId) => {
        if (!window.confirm('Are you sure you want to delete this doctor?')) return;
        try {
            await API.delete(`/doctors/${doctorId}/delete/`);
            fetchDoctors();
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Doctors</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                >
                    <i className="fas fa-user-md me-2"></i>Create Doctor
                </button>
            </div>

            {showForm && (
                <div className="card mb-4">
                    <div className="card-header">{isEditing ? 'Update Doctor' : 'Create Doctor'}</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="row g-3">
                            {!isEditing && (
                                <>
                                    <div className="col-md-6">
                                        <input
                                            className="form-control"
                                            name="username"
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            <div className="col-md-6">
                                <select className="form-select" name="doctor_type" value={formData.doctor_type} onChange={handleChange} required>
                                    <option value="">Select Type</option>
                                    <option value="consulting">Consulting</option>
                                    <option value="referring">Referring</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    name="first_name"
                                    placeholder="First Name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <textarea
                                    className="form-control"
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="col-12 d-flex justify-content-end">
                                <button type="button" className="btn btn-secondary me-2" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-success">
                                    {isEditing ? 'Update Doctor' : 'Create Doctor'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.doctor_id}>
                                <td>{doctor.doctor_id}</td>
                                <td>{doctor.first_name} {doctor.last_name}</td>
                                <td>{doctor.doctor_type}</td>
                                <td>{doctor.phone}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.address}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(doctor.doctor_id)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(doctor.doctor_id)}>
                                       Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {doctors.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center text-muted">No doctors found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorManager;
