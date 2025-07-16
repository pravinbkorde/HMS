import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function HospitalTable() {
    const hospitals = [
        {
            id: 1,
            name: 'General Hospital',
            email: 'admin@generalhospital.com',
            contactPerson: 'John Smith',
            contactNumber: '(555) 123-4567',
            location: 'New York, NY',
            createdDate: '2023-01-15',
        },
        {
            id: 2,
            name: 'City Medical Center',
            email: 'admin@citymedical.com',
            contactPerson: 'Sarah Johnson',
            contactNumber: '(555) 987-6543',
            location: 'Chicago, IL',
            createdDate: '2023-02-20',
        },
        {
            id: 3,
            name: 'Sunshine Hospital',
            email: 'admin@sunshinehospital.com',
            contactPerson: 'Michael Brown',
            contactNumber: '(555) 456-7890',
            location: 'Los Angeles, CA',
            createdDate: '2023-03-10',
        },
        {
            id: 4,
            name: 'Valley Health Center',
            email: 'admin@valleyhealth.com',
            contactPerson: 'Emily Davis',
            contactNumber: '(555) 234-5678',
            location: 'Houston, TX',
            createdDate: '2023-04-05',
        },
        {
            id: 5,
            name: 'Mercy Medical',
            email: 'admin@mercymedical.com',
            contactPerson: 'David Wilson',
            contactNumber: '(555) 876-5432',
            location: 'Miami, FL',
            createdDate: '2023-05-12',
        },
    ];

    return (
        <div className="table-responsive mt-4">
            <table className="table table-bordered table-hover align-middle shadow-sm rounded">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th>Hospital Name</th>
                        <th>Email</th>
                        <th>Contact Person</th>
                        <th>Contact Number</th>
                        <th>Location</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hospitals.map((hospital, index) => (
                        <tr key={hospital.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{hospital.name}</td>
                            <td>{hospital.email}</td>
                            <td>{hospital.contactPerson}</td>
                            <td>{hospital.contactNumber}</td>
                            <td>{hospital.location}</td>
                            <td>{hospital.createdDate}</td>
                            <td>
                                <button className="btn btn-sm btn-outline-primary me-2">
                                    <FontAwesomeIcon icon={faPen} className="me-1" />
                                    
                                </button>
                                <button className="btn btn-sm btn-outline-danger">
                                    <FontAwesomeIcon icon={faTrash} className="me-1" />
                                    
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
