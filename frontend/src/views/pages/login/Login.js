import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton, CCard, CCardBody, CCardGroup,
  CCol, CContainer, CForm, CFormInput,
  CInputGroup, CInputGroupText, CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked } from '@coreui/icons';
import API from '../../../api';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('patients/custom-token/', form, {
        withCredentials: true,
      });
      sessionStorage.setItem('access_token', res.data.access);
      sessionStorage.setItem('refresh_token', res.data.refresh);
      sessionStorage.setItem('user', res.data.role);
      sessionStorage.setItem('username', res.data.username);
      navigate('/dashboard');
    } catch {
      alert('Invalid credentials!');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: `linear-gradient(to right, rgba(78,115,223,0.8), rgba(28,200,138,0.8)), url('https://images.unsplash.com/photo-1588776814546-ec7b05e9b0f6?auto=format&fit=crop&w=1350&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10}>
            <CCardGroup>
              {/* Left Card - Hospital branding */}
              <CCard className="text-white bg-transparent d-none d-md-flex flex-column justify-content-center p-4 border-0" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div className="display-1">🏥</div>
                  <h2 className="fw-bold mt-3">Hospital Admin</h2>
                  <p className="mt-2">
                    Access your dashboard to manage hospitals, appointments, and patients efficiently.
                  </p>
                </CCardBody>
              </CCard>

              {/* Right Card - Login Form */}
              <CCard className="p-4 shadow-lg border-0 rounded-4 bg-white">
                <CCardBody>
                  <h3 className="text-center mb-4 text-primary">Login</h3>
                  <CForm onSubmit={handleSubmit}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>

                    <div className="d-grid">
                      <CButton type="submit" color="primary" size="lg">
                        Login
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
