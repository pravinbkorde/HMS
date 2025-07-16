import React from 'react'
import routes from "../routes"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import config from './config'
import axios from 'axios'
import API from '../api'
export default function OPD() {
    const [AllPatients, setAllPatients] = useState([])
    const navigate = useNavigate();
    const username = sessionStorage.getItem("username")
    const handleaddPatient = () => {
        navigate('/registerpatient')
    }

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await API.get(`patients/get_all_patients/${username}`);
                setAllPatients(response.data.all_patients);  // Adjust based on your API response
                console.log(response.data.all_patients);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);


    return (
        <>
            <button type="button" className="btn btn-outline-primary btn-sm my-2 " onClick={handleaddPatient}>
                <i className="bi bi-plus-lg"></i> Add Patient
            </button>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>First Name</th>
                        {/* <th>Middle Name</th> */}
                        <th>Last Name</th>
                        <th>Gender</th>
                        {/* <th>DOB</th> */}
                        <th>Blood Group</th>
                        <th>Mobile Number</th>
                        {/* <th>Email</th> */}
                        {/* <th>Address</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {AllPatients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.patient_id}</td>
                            <td>{patient.first_name}</td>
                            {/* <td>{patient.middle_name}</td> */}
                            <td>{patient.last_name}</td>
                            <td>{patient.gender}</td>
                            {/* <td>{new Date(patient.dob).toLocaleDateString()}</td> */}
                            <td>{patient.blood_group}</td>
                            <td>{patient.mobile_number}</td>
                            {/* <td>{patient.email}</td> */}
                            {/* <td>{patient.address}</td> */}
                            <td>
                                <button className="btn btn-outline-info btn-sm">
                                    <i className="bi bi-eye"></i> 
                                </button>
                                <button className="btn btn-outline-warning btn-sm mx-2">
                                    <i className="bi bi-pencil"></i> 
                                </button>
                                <button className="btn btn-outline-danger btn-sm">
                                    <i className="bi bi-trash"></i> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
