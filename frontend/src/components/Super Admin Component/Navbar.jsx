import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
   const handleLogOut = ()=>{
        sessionStorage.clear()
        navigate('/')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <FontAwesomeIcon icon={faHospital} className="me-2" />
                        Healthcare Admin Panel
                    </a>

                    <div className="d-flex gap-2">
                        <Link to="/register" className="btn btn-outline-light d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faPlus} />
                            Hospital
                        </Link>

                        <button className="btn btn-outline-light d-flex align-items-center gap-2" onClick={handleLogOut}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
