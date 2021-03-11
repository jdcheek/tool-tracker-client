import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../lib/LoadingSpinner";
import { UserContext } from "../context/UserContext";
import AddInventoryModal from "../modals/AddInventoryModal";
import UserManagementModal from "../modals/UserManagementModal";
import AddUserModal from "../modals/AddUserModal";

const Account = ({ getAccountInfo }) => {
  const mountedRef = useRef(true);
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [addToolModalShow, setAddToolModalShow] = useState(false);
  const [newUserModalShow, setNewUserModalShow] = useState(false);
  const [manageUserModalShow, setManageUserModalShow] = useState(false);

  const getUsers = async () => {
    let list = [];
    try {
      const res = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
      });
      res.data.map((user) =>
        list.push({
          username: user.username,
          _id: user._id,
          isAdmin: user.isAdmin,
        })
      );
      if (mountedRef.current) {
        setUserList(list);
      }
    } catch (err) {
      console.log(`Get users error: ${err}`);
    }
  };

  const checkInItem = async (e, tool) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      // eslint-disable-next-line
      const inv = await axios.post(
        `http://localhost:5000/inventory/update/status/${tool.id}`,
        {
          status: {
            checked_out: false,
            username: "",
            date: new Date(),
          },
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    try {
      // eslint-disable-next-line
      const usr = await axios.post(
        `http://localhost:5000/user/tools`,
        {
          id: tool.id,
          tool_number: tool.tool_number,
          location: tool.location,
          user: currentUser.username,
          checkIn: true,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    getAccountInfo();
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div className='side-bar'>
      <AddInventoryModal
        show={addToolModalShow}
        onHide={() => setAddToolModalShow(false)}
      />
      <UserManagementModal
        show={manageUserModalShow}
        onHide={() => setManageUserModalShow(false)}
        getUsers={getUsers}
        userList={userList}
      />
      <AddUserModal
        show={newUserModalShow}
        onHide={() => setNewUserModalShow(false)}
        getUsers={getUsers}
      />
      <h3>{currentUser.username}</h3>
      {currentUser.toolsCheckedOut.length > 0 ? (
        <h5>Tools Checked Out</h5>
      ) : (
        <h5>No Tools Out</h5>
      )}
      <div className='tool-list'>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ul>
            {currentUser.toolsCheckedOut.map((tool) => (
              <li className='tool-list-item' key={Math.random()}>
                {tool.tool_number}: {tool.location.bin}-{tool.location.shelf}
                <Button
                  className='check-in-btn'
                  variant='outline-primary'
                  onClick={(e) => checkInItem(e, tool)}>
                  Check In
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='manage-section'>
        {currentUser.isAdmin && (
          <>
            <h5>Admin Actions</h5>
            <Button
              variant='outline-dark'
              onClick={() => setAddToolModalShow(true)}>
              New Tool
            </Button>
            <Button
              variant='outline-dark'
              onClick={() => setManageUserModalShow(true)}>
              Manage Users
            </Button>
            <Button
              variant='outline-dark'
              onClick={() => setNewUserModalShow(true)}>
              Add User
            </Button>
          </>
        )}
        <h5>Manage Account</h5>
        <Button variant='outline-dark'>Change Password</Button>
        {!currentUser.isAdmin && (
          <Button onClick={() => alert("Request sent.")} variant='outline-dark'>
            Request Administrator Access
          </Button>
        )}
      </div>
    </div>
  );
};

export default Account;
