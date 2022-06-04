import React, { useState } from "react";
import { Button, Modal, InputGroup, Form, Alert } from "react-bootstrap";
import axios from "axios";

const AddUserModal = (props) => {
  const { getUsers, ...rest } = props;
  const [error, setError] = useState("");
  const clearForm = {
    username: "",
    password: "",
    retypedPassword: "",
    isAdmin: false,
  };
  const [user, setUser] = useState(clearForm);

  const handleCancel = () => {
    setUser(clearForm);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/add`,
        user,
        {
          withCredentials: true,
        }
      );
      getUsers();
      setUser(clearForm);
      return res;
    } catch (err) {
      if (err.response.data) {
        setError({ message: err.response.data });
        setTimeout(() => setError(""), 3000);
      }
      console.log(err.response.data);
    }
  };

  return (
    <Modal
      {...rest}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header
        closeButton
        onClick={() => {
          handleCancel();
        }}>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add New User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error.message && (
          <Alert key={error} variant='danger'>
            {error.message}
          </Alert>
        )}
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text style={{ width: "150px" }}>
              Username
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            isValid={user.username.length >= 3 || ""}
            isInvalid={user.username.length < 3 && user.username !== ""}
            required
            type='text'
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <Form.Control.Feedback type='invalid'>
            Username must be greater than 3 characters
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text style={{ width: "150px" }}>
              Password
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            isValid={user.password.length >= 8}
            isInvalid={user.password.length < 8 && user.password !== ""}
            type='password'
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Form.Control.Feedback type='invalid'>
            Password must be greater than 8 characters
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text style={{ width: "150px" }}>
              Retype Password
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type='password'
            required
            isValid={
              user.password === user.retypedPassword &&
              user.retypedPassword !== ""
            }
            isInvalid={user.password !== user.retypedPassword}
            value={user.retypedPassword || ""}
            onChange={(e) =>
              setUser({ ...user, retypedPassword: e.target.value })
            }
          />
          <Form.Control.Feedback type='invalid'>
            Passwords do not match
          </Form.Control.Feedback>
        </InputGroup>

        <Form>
          <Form.Check
            type='switch'
            checked={user.isAdmin}
            onChange={() => setUser({ ...user, isAdmin: !user.isAdmin })}
            id='admin'
            label='Administrative Access'
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-primary'
          onClick={() => {
            handleSubmit();
            props.onHide();
          }}>
          Add User
        </Button>

        <Button
          variant='outline-dark'
          onClick={() => {
            props.onHide();
            handleCancel();
          }}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
