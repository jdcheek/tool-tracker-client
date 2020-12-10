import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ getUsers, isLoading }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    retypedPassword: "",
  });
  const addNewUser = async (userToAdd) => {
    try {
      const res = await axios.post(
        "https://infinite-stream-86590.herokuapp.com/user/add",
        userToAdd,
        { withCredentials: true }
      );
      return res;
    } catch (err) {
      console.log(`Add user error: ${err}`);
    }
  };

  const onAddSubmit = (e) => {
    e.preventDefault();
    addNewUser(newUser);
    setNewUser({ username: "", password: "", retypedPassword: "" });
  };

  return (
    <div>
      <div>
        <h2>Create New User</h2>
      </div>
      <form onSubmit={onAddSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            required
            className='form-control'
            value={newUser.username}
            onChange={(e) => {
              setNewUser({ ...newUser, username: e.target.value });
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Password</label>
          <input
            type='text'
            required
            className='form-control'
            value={newUser.password}
            onChange={(e) => {
              setNewUser({ ...newUser, password: e.target.value });
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Retype Password</label>
          <input
            type='text'
            required
            className='form-control'
            value={newUser.retypedPassword}
            onChange={(e) => {
              setNewUser({ ...newUser, retypedPassword: e.target.value });
            }}
          />
        </div>
        <div>
          {newUser.username.length < 3 ? (
            <p>Username must be at least 3 characters</p>
          ) : newUser.password.length < 8 ? (
            <p>Password must be at least 8 characters</p>
          ) : newUser.password !== newUser.retypedPassword ? (
            <p>Passwords do not match</p>
          ) : (
            <button onClick={onAddSubmit}>Add New User</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddUser;
