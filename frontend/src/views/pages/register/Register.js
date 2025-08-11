// src/Register.js
import React, { useState } from 'react';
import {
  CButton, CForm, CFormInput, CInputGroup, CInputGroupText, CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked, cilPeople } from '@coreui/icons';
import API from '../../../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    username: '', email: '', password: '', password2: '', role: '',ManagePassword:''
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    if (form.password !== form.password2) return alert('Passwords do not match');

    try {
      await API.post('patients/register/', form);
      alert('Registered!');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data)
        alert(JSON.stringify(error.response.data))
      } else {
        console.error("Unknown error:", error.message)
        alert("Registration failed!")
      }
    }

  };

  return (
    <div className="container w-50 mt-5">
      <CForm onSubmit={handleSubmit}>
        <label htmlFor="centername" className='mb-2'>Center name</label>
        <CInputGroup className="mb-3">
          <CInputGroupText className='bg-success'><CIcon icon={cilUser} /></CInputGroupText>
          <CFormInput name="centername" placeholder="Enter Username" onChange={handleChange} id='centername'required />
        </CInputGroup>
        <label htmlFor="username" className='mb-2'>Username</label>
        <CInputGroup className="mb-3">
          <CInputGroupText className='bg-success'><CIcon icon={cilUser} /></CInputGroupText>
          <CFormInput name="username" placeholder="Enter Username" onChange={handleChange} id='username'required />
        </CInputGroup>
        <label htmlFor="email" className='mb-2'>Email</label>
        <CInputGroup className="mb-3">
          <CInputGroupText className='bg-success'>@</CInputGroupText>
          <CFormInput type="email" name="email" placeholder="Email" onChange={handleChange} id= "email" required />
        </CInputGroup>
        <label htmlFor="password" className='mb-2'>Password</label>
        <CInputGroup className="mb-3">
          <CInputGroupText className='bg-success'><CIcon icon={cilLockLocked} /></CInputGroupText>
          <CFormInput type="password" name="password" placeholder="Password" onChange={handleChange} id='password' required />
        </CInputGroup>
        <label htmlFor="confirm password" className='mb-2'>Confirm Password</label>
        <CInputGroup className="mb-3">
          <CInputGroupText className='bg-success'><CIcon icon={cilLockLocked} /></CInputGroupText>
          <CFormInput type="password" name="password2" placeholder="Confirm Password" onChange={handleChange} id='confirm password' required />
        </CInputGroup>
         <label htmlFor="role" className='mb-2'>Role</label>
        <CInputGroup className="mb-3">
          <CInputGroupText className='bg-success'><CIcon icon={cilPeople} id='role' /></CInputGroupText>
          <CFormSelect name="role" value={form.role} onChange={handleChange} required>
            <option value="" disabled>Select Role</option>
            <option value="admin">Admin</option>
            <option value="receptionist">Receptionist</option>
            <option value="doctor">Doctor</option>
          </CFormSelect>
        </CInputGroup>
        <label htmlFor="manage" className='mb-2'>Manage Password</label>
        <CInputGroup className="mb-3">
          <CInputGroupText className='bg-success'><CIcon icon={cilLockLocked} /></CInputGroupText>
          <CFormInput name="ManagePassword" placeholder="Enter Manage PAssword" onChange={handleChange} id='manage'required />
        </CInputGroup>
        <div className="d-grid">
          <CButton type="submit" color="success">Create Account</CButton>
        </div>
      </CForm>
    </div>
  );
}
