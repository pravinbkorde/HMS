import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import config from '../../../components/config'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) return alert('Passwords do not match')

    try {
      await axios.post(`${config.API_URL}/api/register/`, {
        username,
        email,
        password,
      })

      alert('Registered successfully!')
      navigate('/login')
    } catch (error) {
      console.error(error)
      alert('Registration failed!')
    }
  }
  return (
    <div className="container w-50 mt-5">
      <CForm onSubmit={handleRegister}>
        <CInputGroup className="mb-3">
          <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
          <CFormInput value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>@</CInputGroupText>
          <CFormInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
          <CFormInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </CInputGroup>
        <CInputGroup className="mb-4">
          <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
          <CFormInput type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" />
        </CInputGroup>
        <div className="d-grid">
          <CButton type="submit" color="success">Create Account</CButton>
        </div>
      </CForm></div>
  )
}

export default Register
