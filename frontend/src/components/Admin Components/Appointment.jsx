import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import API from '../../api';
export default function Appointment() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patientName: '',
        guardianName: '',
        gender: '',
        dob: '',
        age: '',
        bloodGroup: '',
        maritalStatus: '',
        phone: '',
        email: '',
        address: '',
        remark: '',
        nid: '',
    });

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...formData, [name]: value };

        // Auto-calculate age when DOB is entered
        if (name === 'dob') {
            const birthDate = new Date(value);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            newFormData.age = age;
        }

        setFormData(newFormData);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('access_token');

        try {
            const res = await API.post(
                'patients/register_patient/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(formData)
            alert(res.data.message);
            setFormData({
                patientName: '',
                guardianName: '',
                gender: '',
                dob: '',
                age: '',
                bloodGroup: '',
                maritalStatus: '',
                phone: '',
                email: '',
                address: '',
                remark: '',
                nid: '',
            });

            const modalEl = document.getElementById('addPatientModal');
            const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modalInstance.hide();
            window.location.reload();
            navigate('/appointment');
            
        } catch (error) {
            console.error('❌ Error submitting patient:', error);
            alert('Failed to submit. Please try again.');
        }
    };

return (
    <>
        <div className="container mt-4">
            <button
                className="btn btn-primary btn-sm me-2 mb-2"
                data-bs-toggle="modal"
                data-bs-target="#addPatientModal"
            >
                Add Patient
            </button>
            <button className="btn btn-primary btn-sm mb-2">Book Appointment</button>

            <table className="table table-bordered mt-3">
                <thead className="table">
                    <tr>
                        <th>No.</th>
                        <th>Patient Name</th>
                        <th>Appointment Date</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Doctor</th>
                        <th>Source Type</th>
                        <th>Fees</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        {/* Modal */}
        {/* Modal */}
        <div
            className="modal fade"
            id="addPatientModal"
            tabIndex="-1"
            aria-labelledby="addPatientModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content d-flex flex-column h-100">
                    <form onSubmit={handleSubmit} className="d-flex flex-column h-100">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addPatientModalLabel">
                                Add Patient
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        {/* Make body scrollable if content is long */}
                        <div className="modal-body overflow-auto flex-grow-1">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Patient Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Guardian Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="guardianName"
                                        value={formData.guardianName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Gender</label>
                                    <select
                                        className="form-select"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Age</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="age"
                                        value={formData.age}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Blood Group</label>
                                    <select
                                        className="form-select"
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        {bloodGroups.map((bg, idx) => (
                                            <option key={idx} value={bg}>
                                                {bg}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Marital Status</label>
                                    <select
                                        className="form-select"
                                        name="maritalStatus"
                                        value={formData.maritalStatus}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">Remark</label>
                                    <textarea
                                        className="form-control"
                                        name="remark"
                                        value={formData.remark}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">
                                        National Identification Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nid"
                                        value={formData.nid}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>
);
}
