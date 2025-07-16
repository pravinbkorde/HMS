import React from 'react'
import Navbar from '../Navbar'
import Card from '../Card'
import HospitalTable from '../HospitalTable'
export default function SuperAdminDashboard() {
    return (
        <div>
            <div className='mb-2'>
                <Navbar />
            </div>
            <div className="container">
                <Card />
                <HospitalTable />
            </div>
        </div>
    )
}
