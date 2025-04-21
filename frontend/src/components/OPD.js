import React from 'react'
import routes from "../routes"
import { useNavigate } from 'react-router-dom'
export default function OPD() {
    const navigate = useNavigate();
    const handleaddPatient = ()=>{
        navigate('/registerpatient')
    }
    return (
        <>
       <button type="button" className="btn btn-outline-primary btn-sm my-2 " onClick={handleaddPatient}>
                <i className="bi bi-plus-lg"></i> Add Patient
            </button>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        <th>OPD ID</th>
                        <th>Consulting Doctor</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>354rgt</td>
                        <td>Dr.Rishikesh    </td>
                        <th><button className="btn btn-outline-info btn-sm">
                                <i className="bi bi-eye"></i> View
                            </button>
                            <button className="btn btn-outline-warning btn-sm mx-2">
                                <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button className="btn btn-outline-danger btn-sm">
                                <i className="bi bi-trash"></i> Delete
                            </button></th>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
