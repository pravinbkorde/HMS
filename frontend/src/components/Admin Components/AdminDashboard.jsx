import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Button, Card } from 'react-bootstrap';
import { FaUsers, FaChartBar, FaCog, FaBars, FaExpand, FaCompress } from 'react-icons/fa'; 
import { Link, Outlet } from 'react-router-dom'; // Import Outlet for rendering child routes
import 'bootstrap/dist/css/bootstrap.min.css';
import './admincss/AdminDashboard.css'; 

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false); // Sidebar collapse state
  const [isFullScreen, setIsFullScreen] = useState(false); // Fullscreen state

  // Function to toggle the sidebar collapse
  const toggleSidebar = () => setCollapsed(!collapsed);

  // Function to toggle full-screen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      }).catch((err) => {
        console.log("Error trying to enable full-screen mode: ", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        }).catch((err) => {
          console.log("Error trying to exit full-screen mode: ", err);
        });
      }
    }
  };

  return (
    <div>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            {/* Removed the Search Button */}
          </Nav>
          <Nav>
            <Nav.Link href="#">Logout</Nav.Link>
            <Nav.Link href="#" onClick={toggleFullScreen}>
              {/* Use icons for the full-screen button */}
              {isFullScreen ? <FaCompress /> : <FaExpand />}
            </Nav.Link>
            {/* Sidebar Collapse Button on Navbar */}
            <Nav.Link href="#" onClick={toggleSidebar}>
              <FaBars />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid>
        <Row className="no-gutters">
          {/* Sidebar */}
          <Col
            xs={collapsed ? 1 : 3}
            id="sidebar"
            className={`sidebar ${collapsed ? 'collapsed' : ''}`}
            style={{
              transition: 'width 0.3s ease',
              width: collapsed ? '50px' : '250px', // Sidebar collapse width
            }}
          >
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link as={Link} to="/admin/home">
                  <FaChartBar /> {!collapsed && 'Dashboard'}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/admin/users">
                  <FaUsers /> {!collapsed && 'Users'}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/admin/settings">
                  <FaCog /> {!collapsed && 'Settings'}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          {/* Content Area */}
          <Col
            xs={collapsed ? 11 : 9}
            id="content"
            className="content"
            style={{
              transition: 'margin-left 0.3s ease', // Smooth transition for content shift
              marginLeft: collapsed ? '50px' : '250px', // Adjust content when sidebar collapses
            }}
          >
            {/* Render the matched route here */}
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
