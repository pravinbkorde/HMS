import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import API from '../../api';

export default function CreateOPD() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDoctorType, setSelectedDoctorType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [opds, setOpds] = useState([]);

  // Fetch doctors and OPDs on page load
  useEffect(() => {
    fetchDoctors();
    fetchOPDs();
  }, []);

  const fetchDoctors = async () => {
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('access_token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await API.get(`/patients/doctors/by_user/${username}/`, config);
      setDoctors(res.data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchOPDs = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await API.get('/patients/list_opds/', config);
      setOpds(res.data || []);
    } catch (error) {
      console.error('Error fetching OPDs:', error);
    }
  };

  const handleDoctorSelect = (e) => {
    const doctorId = e.target.value;
    setSelectedDoctorId(doctorId);

    const doctor = doctors.find((doc) => doc.id.toString() === doctorId);
    setSelectedDoctorType(doctor ? doctor.doctor_type : '');
  };

  const resetModal = () => {
    setSelectedDoctorId('');
    setSelectedDoctorType('');
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('access_token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await API.post(
        '/patients/create_opd/',
        { doctor: selectedDoctorId },
        config
      );

      console.log('OPD created successfully:', response.data);
      alert("OPD created successfully")

      fetchOPDs(); // Refresh table
      resetModal();
    } catch (error) {
      console.error('Error creating OPD:', error);
    }
  };
const handleOPDView=()=>{
    console.log("handleOPDView function run")
}

const handleOPDDelete=()=>{
    console.log("handleOPDDelete function run")
}
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Outpatient Department (OPD)</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add OPD
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>OPD ID</th>
            <th>Doctor</th>
            <th>Doctor Type</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {opds.length > 0 ? (
            opds.map((opd, index) => (
              <tr key={index}>
                <td>{opd.opd_id}</td>
                <td>{opd.doctor_name || 'N/A'}</td>
                <td>{opd.doctor_type || 'N/A'}</td>
                <td>{new Date(opd.create_date).toLocaleString()}</td>
                <td>
                    <button className='btn btn-sm btn-primary me-2'onClick={handleOPDView}>View</button>
                    <button className='btn btn-sm btn-danger' onClick={handleOPDDelete}>Delete OPD</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No OPDs found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={resetModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New OPD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Select Doctor</Form.Label>
              <Form.Select value={selectedDoctorId} onChange={handleDoctorSelect} required>
                <option value="">-- Select Doctor --</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    Dr. {doc.first_name} {doc.last_name} ({doc.doctor_id})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Doctor Type</Form.Label>
              <Form.Control type="text" value={selectedDoctorType} readOnly />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" className="me-2" onClick={resetModal}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
