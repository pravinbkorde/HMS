import React, { useState } from 'react';
import { Table, Button, Form, InputGroup, FormControl, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaPlus, FaEye, FaEdit, FaTrashAlt, FaKey } from 'react-icons/fa'; // Importing necessary icons

const Users = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  // Placeholder data for users (you can replace it with real data)
  const users = [
    { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@gmail.com', status: 'Inactive' },
    { id: 3, name: 'Michael Johnson', email: 'michaelj@gmail.com', status: 'Active' },
    { id: 4, name: 'Emily Davis', email: 'emilydavis@gmail.com', status: 'Inactive' },
    // Add more users as needed
  ];

  // Filter users based on search query (case insensitive)
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Functions for each action (these will log to the console when clicked)
  const viewUser = (userName) => {
    console.log(`View User: ${userName}`);
  };

  const editUser = (userName) => {
    console.log(`Edit User: ${userName}`);
  };

  const deleteUser = (userName) => {
    console.log(`Delete User: ${userName}`);
  };

  const seePassword = (userName) => {
    console.log(`See Password: ${userName}`);
  };

  return (
    <div>
      <h2>Users</h2>

      {/* Add User Button and Search Bar */}
      <div className="d-flex justify-content-between mb-3">
        {/* Add User Button with Plus Icon */}
        <Button variant="success" size="sm" className="me-2">
          <FaPlus />
        </Button>

        {/* Horizontal Search Bar */}
        <InputGroup className="text-white"> {/* Adjust width if necessary */}
          <FormControl
            placeholder="Search Users"
            aria-label="Search Users"
            aria-describedby="basic-addon2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query on input change
            style={{ backgroundColor: '#343a40', color: 'white' }} // Black background for search bar
          />
        </InputGroup>
      </div>

      {/* Users Table */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Action</th> {/* Action column */}
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No users found</td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                {/* Action Column with Icons */}
                <td>
                  <div className="d-flex justify-content-start">
                    {/* Eye Icon for View User */}
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip-view-${user.id}`}>View User</Tooltip>}
                    >
                      <Button
                        variant="link"
                        size="sm"
                        className="me-1"
                        onClick={() => viewUser(user.name)} // Call viewUser function
                      >
                        <FaEye />
                      </Button>
                    </OverlayTrigger>

                    {/* Edit Icon for Edit User */}
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip-edit-${user.id}`}>Edit User</Tooltip>}
                    >
                      <Button
                        variant="link"
                        size="sm"
                        className="me-1"
                        onClick={() => editUser(user.name)} // Call editUser function
                      >
                        <FaEdit />
                      </Button>
                    </OverlayTrigger>

                    {/* Trash Icon for Delete User */}
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip-delete-${user.id}`}>Delete User</Tooltip>}
                    >
                      <Button
                        variant="link"
                        size="sm"
                        className="me-1 text-danger"
                        onClick={() => deleteUser(user.name)} // Call deleteUser function
                      >
                        <FaTrashAlt />
                      </Button>
                    </OverlayTrigger>

                    {/* Key Icon for See Password */}
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip-password-${user.id}`}>Change Password</Tooltip>}
                    >
                      <Button
                        variant="link"
                        size="sm"
                        className="me-1 text-warning"
                        onClick={() => seePassword(user.name)} // Call seePassword function
                      >
                        <FaKey />
                      </Button>
                    </OverlayTrigger>
                  </div>
                </td>

                {/* Other user details */}
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
