import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../../../api';
export default function SuperAdminDashboard() {
  const navigate = useNavigate()
  const [AllAdmin, setAllAdmin] = useState({})
  const handleLogOut = () => {
    localStorage.clear()
    sessionStorage.clear()

    navigate('/loginsuperadmin')

  }

  const handleCreateAdmin = () => {
    navigate("/register")
  }

  const fetchAdimin = async () => {
    const token = sessionStorage.getItem("access_token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await API.get(`patients/get_all_admin/`, config);
      console.log(res.data.admins)
      setAllAdmin(res.data.admins)
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  useEffect(() => {
    fetchAdimin();
  }, []);


const handlerestrict =async (data)=>{
  console.log("Data to send",data)
  const token = sessionStorage.getItem("access_token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await API.post(`patients/restrict_admin/`,data, config)
    } catch (error) {
      
    }
}
  // console.log(`All Admin:`, AllAdmin)
  return (
    <>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Super Admin</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container mt-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Super Admin Dashboard</h2>
          <button className="btn btn-primary" onClick={handleCreateAdmin}>Create Admin</button>
        </div>

        {/* Cards */}
        <div className="row mb-4">
          
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Card</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Card</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Card</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Card</h5>
                </div>
              </div>
            </div>
        
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle table-striped">
            <thead className="table-light">
              <tr>
                <th>Center Name</th>
                <th>Admin Username</th>
                <th>Login Password</th>
                <th>Manage Password</th>
                <th>Created Date</th>
                <th>Restrict User</th>
              </tr>
            </thead>
            <tbody>
              {AllAdmin.length > 0 ? (
                AllAdmin.map((admin, index) => (
                  <tr key={admin.id}>
                    <td>{admin.centerName || 'N/A'}</td>
                    <td>{admin.username}</td>
                    <td>{admin.password}</td>
                    <td>{admin.managePassowrd || 'N/A'}</td>
                    <td>{new Date(admin.created_at).toLocaleDateString() || 'N/A'}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <select
                          className="form-select me-2"
                          value={admin.restricted ? "Yes" : "No"}
                          onChange={(e) => {
                            const updatedAdmins = [...AllAdmin];
                            updatedAdmins[index].restricted = e.target.value === "Yes";
                            setAllAdmin(updatedAdmins);
                          }}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => (handlerestrict(AllAdmin[index]))}
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>


          </table>
        </div>
      </div>
    </>
  );
}
