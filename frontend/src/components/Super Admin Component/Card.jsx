import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function Card() {
    return (
        <div className="container m-3">
            <div className="row justify-content-center g-4">
                {/* Total Hospitals Card */}
                <div className="col-md-5">
                    <div className="card shadow rounded-4 border-0 bg-primary text-white h-100">
                        <div className="card-body d-flex align-items-center justify-content-between p-4">
                            <div>
                                <h6 className="text-uppercase fw-bold mb-1">Total Hospitals</h6>
                                <h2 className="fw-semibold">25</h2>
                                <p className="mb-0 text-white-50 small">Across all regions</p>
                            </div>
                            <FontAwesomeIcon icon={faHospital} size="3x" className="opacity-75" />
                        </div>
                    </div>
                </div>

                {/* Active Hospitals Card */}
                <div className="col-md-5">
                    <div className="card shadow rounded-4 border-0 bg-success text-white h-100">
                        <div className="card-body d-flex align-items-center justify-content-between p-4">
                            <div>
                                <h6 className="text-uppercase fw-bold mb-1">Active Hospitals</h6>
                                <h2 className="fw-semibold">18</h2>
                                <p className="mb-0 text-white-50 small">Currently operating</p>
                            </div>
                            <FontAwesomeIcon icon={faCheckCircle} size="3x" className="opacity-75" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
