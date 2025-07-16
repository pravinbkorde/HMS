import React, { useEffect, useState } from 'react';
import API from '../../api'; // Your Axios instance

const CreateIPD = () => {
    const [formData, setFormData] = useState({
        doctor: '',
    });

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [ipdList, setIpdList] = useState([]); // 🆕 IPD List
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchDoctors();
        fetchIPDs(); // 🆕 Fetch existing IPDs
    }, []);

    const fetchPatients = async () => {
        const username = sessionStorage.getItem("username");
        const token = sessionStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await API.get(`/patients/get_all_patients/${username}`, config);
            setPatients(res.data.all_patients || []);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setErrorMessage("Failed to fetch patients.");
        }
    };

    const fetchDoctors = async () => {
        const username = sessionStorage.getItem("username");
        const token = sessionStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await API.get(`/patients/doctors/by_user/${username}/`, config);
            setDoctors(res.data || []);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setErrorMessage("Failed to fetch doctors.");
        }
    };

    const fetchIPDs = async () => {
        const username = sessionStorage.getItem("username");
        const token = sessionStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await API.get(`/patients/get_ipd_ids_by_user/${username}/`, config);
            setIpdList(res.data.ipds || []); // ✅ fix this line
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching IPDs:", error);
        }
    };


    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            await API.post('patients/ipds/create/', formData, config);
            setSuccessMessage("✅ IPD Created Successfully!");
            setErrorMessage('');
            setFormData({
                patient: '',
                doctor: '',
                reason_for_admission: '',
                notes: ''
            });
            setShowForm(false);
            fetchIPDs(); // 🆕 Refresh table
        } catch (error) {
            console.error("Error creating IPD:", error.response?.data || error.message);
            const detail = error.response?.data?.detail || "Failed to create IPD.";
            setErrorMessage(`❌ ${detail}`);
            setSuccessMessage('');
        }
    };
    const handleIPDClick = (ipdId) => {
        console.log(ipdId);
    };
    return (
        <div className="container mt-5">
            {!showForm ? (
                <div className="text-end mb-3">
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        Create IPD
                    </button>
                </div>
            ) : (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3>Create IPD Admission</h3>
                        <button className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                    </div>

                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <form onSubmit={handleSubmit} className="row g-3">


                        <div className="col-md-6">
                            <label className="form-label">Assign Doctor</label>
                            <select
                                name="doctor"
                                className="form-select"
                                value={formData.doctor}
                                onChange={handleChange}
                            >
                                <option value="">-- Choose Doctor --</option>
                                {doctors.map(d => (
                                    <option key={d.id} value={d.id}>
                                        Dr. {d.first_name} {d.last_name} ({d.doctor_id})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 text-end">

                            <button type="button" className="btn btn-outline-secondary me-2" onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-success">
                                Submit IPD
                            </button>
                        </div>
                    </form>
                </>
            )}

            {/* 🆕 IPD Table */}
            <div className="mt-5">
                <h4 className="mb-3">IPD List</h4>
                {ipdList.length === 0 ? (
                    <p>No IPDs found.</p>
                ) : (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>IPD ID</th>
                                <th>Doctor Name</th>
                                <th>Doctor Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ipdList.map((ipd, index) => (
                                <tr key={ipd.ipd_id}>
                                    <td>{index + 1}</td>
                                    <td>{ipd.ipd_id}</td>
                                    <td>{ipd.doctor?.name || 'Not Assigned'}</td>
                                    <td>{ipd.doctor?.type || 'N/A'}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleIPDClick(ipd.ipd_id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
};

export default CreateIPD;
