import React, { useState, useContext, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
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
      const res = await axios.post("http://localhost:5000/auth/login", user, {
        withCredentials: true,
      });
      if (res.data.message) {
        return res.data.message;
      }
      setCurrentUser({
        isLoggedIn: true,
        isAdmin: res.data.isAdmin,
        username: res.data.username,
      });
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
      history.push("/inventory");
    }
    return () => (mountedRef.current = false);
  }, [currentUser, history]);

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            required
            className='form-control'
            value={user.username}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Password</label>
          <input
            type='text'
            name='password'
            required
            className='form-control'
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
