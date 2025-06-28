// src/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton, CCard, CCardBody, CCardGroup,
  CCol, CContainer, CForm, CFormInput,
  CInputGroup, CInputGroupText, CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked } from '@coreui/icons';
import API from '../../../api';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    
    // console.log(form)
    try {
      const res = await API.post('patients/custom-token/', form,
        { withCredentials: true } // for getting or storing session info
      );
      sessionStorage.setItem('access_token', res.data.access);
      sessionStorage.setItem('refresh_token', res.data.refresh);
      console.log(res.data)
      navigate('/dashboard');
    } catch {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
                      <CFormInput name="username" placeholder="Username" onChange={handleChange} required/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
                      <CFormInput type="password" name="password" placeholder="Password" onChange={handleChange} required/>
                    </CInputGroup>
                    <CButton type="submit" color="primary" className="px-4">Login</CButton>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="bg-primary text-white py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <h2>Sign up</h2>
                  <p>New here? Register now.</p>
                  <Link to="/register">
                    <CButton color="light" className="mt-3">Register Now!</CButton>
                  </Link>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
