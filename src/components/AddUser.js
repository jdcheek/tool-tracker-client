import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";

const AddUser = ({ getUsers, isLoading }) => {
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    retypedPassword: "",
  });

  const addNewUser = async (userToAdd) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/add",
        userToAdd,
        { withCredentials: true }
      );
      setError("");
      setNewUser({ username: "", password: "", retypedPassword: "" });
      getUsers();
      return res;
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const onAddSubmit = (e) => {
    e.preventDefault();
    addNewUser(newUser);
  };

  return (
    <Form onSubmit={onAddSubmit}>
      <Form.Group as={Col} controlId='formGridUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          type='text'
          placeholder='Enter username'
          name='username'
          value={newUser.username}
        />
      </Form.Group>

      <Form.Group as={Col} controlId='formGridPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          type='password'
          placeholder='Password'
          name='password'
          value={newUser.password}
        />
      </Form.Group>

      <Form.Group as={Col} controlId='formGridRetypePassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          type='password'
          placeholder='Retype password'
          name='retypedPassword'
          value={newUser.retypedPassword}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
      {error ? <h3>{error}</h3> : null}
    </Form>
  );
};

export default AddUser;
