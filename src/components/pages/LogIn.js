import React, { useState, useContext, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

export default function LogIn() {
  const mountedRef = useRef(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!mountedRef.current) {
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/auth/login`,
        user,
        {
          withCredentials: true,
        }
      );
      if (res.data.message) {
        return res.data.message;
      }
      setCurrentUser(res.data);
    } catch (err) {
      console.log(`Authorization ${err}`);
    }
    setUser({
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      history.push("/tools");
    }
    return () => (mountedRef.current = false);
  }, [currentUser, history]);

  return (
    <Card className='login-container'>
      <Card.Header as='h5'>Log In</Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmit} className='login-form'>
          <Form.Group>
            <Form.Control
              type='username'
              placeholder='Enter Username'
              name='username'
              required
              value={user.username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              name='password'
              required
              value={user.password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant='outline-primary' type='submit'>
            Log In
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
