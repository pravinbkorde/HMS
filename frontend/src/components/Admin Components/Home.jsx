// src/components/Admin Components/Home.js
import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="dashboard-card bg-dark text-white">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>View and manage all users.</Card.Text>
              <Button variant="primary" href="/admin/users">Go to Users</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
        <Card className="dashboard-card bg-dark text-white">
            <Card.Body>
              <Card.Title>Reports</Card.Title>
              <Card.Text>View detailed reports.</Card.Text>
              <Button variant="primary">View Reports</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
        <Card className="dashboard-card bg-dark text-white">
            <Card.Body>
              <Card.Title>Settings</Card.Title>
              <Card.Text>Manage your admin settings.</Card.Text>
              <Button variant="primary" href="/admin/settings">Go to Settings</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
