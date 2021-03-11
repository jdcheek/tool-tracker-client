import React, { useState } from "react";
import { Button, Modal, InputGroup, Form, Alert } from "react-bootstrap";
import axios from "axios";

const AddUserModal = (props) => {
  const { userList, getUsers, ...rest } = props;
  const [error, setError] = useState("");
  const clearForm = {
    username: "",
    password: "",
    retypedPassword: "",
    isAdmin: false,
  };
  const [selectedUser, setSelectedUser] = useState(clearForm);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleCancel = () => {
    setSelectedUser(clearForm);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/update/${selectedUser._id}`,
        selectedUser,
        {
          withCredentials: true,
        }
      );
      setSelectedUser(clearForm);
      getUsers();
      return res;
    } catch (err) {
      if (err.response.data) {
        setError({ message: err.response.data });
        setTimeout(() => setError(""), 3000);
      } else {
        console.log(err);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER}/user/delete/${selectedUser._id}`,
        { withCredentials: true }
      );
      getUsers();
      setSelectedUser(clearForm);
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
          Manage Users
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group style={{ width: "100%" }}>
            <Form.Label>
              <h5 className='mb-3'>Select User</h5>
            </Form.Label>
            <Form.Control as='select' htmlSize={3} custom>
              {userList.map((user) => (
                <option
                  onClick={(e) => setSelectedUser(user)}
                  key={user._id}
                  value={user}>
                  {user.username}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer></Modal.Footer>
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
            isValid={selectedUser.username.length >= 3 || ""}
            isInvalid={
              selectedUser.username.length < 3 && selectedUser.username !== ""
            }
            required
            type='text'
            value={selectedUser.username}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, username: e.target.value })
            }
          />
          <Form.Control.Feedback type='invalid'>
            Username must be greater than 3 characters
          </Form.Control.Feedback>
        </InputGroup>
        {showPasswordForm && (
          <>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text style={{ width: "150px" }}>
                  Password
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                isValid={
                  selectedUser.password
                    ? selectedUser.password.length >= 8
                    : false
                }
                isInvalid={
                  selectedUser.password
                    ? selectedUser.password.length < 8 &&
                      selectedUser.password !== ""
                    : false
                }
                type='password'
                value={selectedUser.password}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, password: e.target.value })
                }
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
                isValid={
                  selectedUser.password
                    ? selectedUser.password === selectedUser.retypedPassword &&
                      selectedUser.retypedPassword !== ""
                    : false
                }
                isInvalid={
                  selectedUser.password
                    ? selectedUser.password !== selectedUser.retypedPassword
                    : false
                }
                value={selectedUser.retypedPassword || ""}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    retypedPassword: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback type='invalid'>
                Passwords do not match
              </Form.Control.Feedback>
            </InputGroup>
          </>
        )}

        <Form>
          <Form.Check
            type='switch'
            checked={selectedUser.isAdmin}
            onChange={() =>
              setSelectedUser({
                ...selectedUser,
                isAdmin: !selectedUser.isAdmin,
              })
            }
            id='admin'
            label='Administrative Access'
          />
          <Form.Check
            type='switch'
            checked={showPasswordForm}
            onChange={() => setShowPasswordForm(!showPasswordForm)}
            id='passwordReset'
            label='Reset Password'
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-primary'
          onClick={() => {
            handleSubmit();
          }}>
          Update
        </Button>
        <Button
          variant='outline-danger'
          disabled={!selectedUser._id}
          onClick={() => {
            selectedUser._id && handleDelete();
          }}>
          Delete
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
