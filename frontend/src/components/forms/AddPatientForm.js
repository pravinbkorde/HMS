import React, { useState } from 'react';
import config from '../config';
import axios from 'axios';
export default function AddPatientForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        address: '',
        gender: '',
        mobile: '',
        dob: '',
        bloodGroup: '',
        email: '',
        consultingDoctor: ''
    });

    const [repsonseMessage, setrepsonseMessage] = useState("")
    const [showModal, setshowModal] = useState(false)

    // Handle change in form inputs
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post(`${config.API_URL}/patients/`, formData);
            setrepsonseMessage(response.data.message);
            setshowModal(true);
            console.log(response.data)
        }catch (error) {
            console.error("Error submitting form:", error);
          
            const errorData = error.response?.data;
            setrepsonseMessage(
              typeof errorData === 'object'
                ? JSON.stringify(errorData, null, 2)
                : 'An unexpected error occurred.'
            );
            setshowModal(true);

        }
    };

    return (
        <>
            <div className="container">
                {/* Add Doctor button */}
                <div className="text-start mb-3">
                    <h3>Add OPD Patient</h3>
                </div>


                {/* Form */}
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="firstname" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter First Name"
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="mname" className="form-label">Middle Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            placeholder="Enter Middle Name"
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter Last Name"
                            required
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter Address"
                            required
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <select
                            className="form-select mb-3"
                            aria-label="Gender"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <label htmlFor="mobilenumber" className="form-label">Mobile</label>
                        <input
                            type="number"
                            className="form-control"
                            id="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter Mobile Number"
                            required
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Blood Group Dropdown */}
                    <div className="col-6">
                        <label htmlFor="bloodgroup" className="form-label">Blood Group</label>
                        <select
                            className="form-select mb-3"
                            id="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    {/* Email */}
                    <div className="col-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                        />
                    </div>

                    {/* Consulting Doctor Dropdown */}
                    <div className="col-4">
                        <label htmlFor="consultingDoctor" className="form-label">Consulting Doctor</label>
                        <select
                            className="form-select mb-3"
                            id="consultingDoctor"
                            value={formData.consultingDoctor}
                            onChange={handleChange}

                        >
                            <option value="">Select Doctor</option>
                            <option value="Dr. Rishikesh">Dr. Rishikesh</option>
                            <option value="Dr. Asha">Dr. Asha</option>
                            <option value="Dr. Rohit">Dr. Rohit</option>
                            <option value="Dr. Priya">Dr. Priya</option>
                        </select>

                    </div>
                    <div className="col-2 my-5">
                        <button className="btn btn-outline-danger btn-sm">Add Doctor</button>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                    </div>
                </form>
            </div>
            {/* Modal */}
            <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Server Response</h5>
                            <button type="button" className="btn-close" onClick={() => setshowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>{repsonseMessage}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setshowModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
