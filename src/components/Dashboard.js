import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import EditInventory from "./EditInventory";

export default function Dashboard() {
  const mountedRef = useRef(true);
  const [inventory, setInventory] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getInventory = async () => {
    try {
      const res = await axios.get(
        "https://infinite-stream-86590.herokuapp.com/inventory",
        {
          withCredentials: true,
        }
      );
      if (mountedRef.current) {
        setInventory(res.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    let list = [];
    try {
      const res = await axios.get(
        "https://infinite-stream-86590.herokuapp.com/user",
        {
          withCredentials: true,
        }
      );
      res.data.map((user) =>
        list.push({
          username: user.username,
          _id: user._id,
          isAdmin: user.isAdmin,
        })
      );
      if (mountedRef.current) {
        setUserList(list);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(`Get users error: ${err}`);
    }
  };

  useEffect(() => {
    getUsers();
    getInventory();
    return () => (mountedRef.current = false);
  }, []);

  return (
    <div className='dashboard-grid-container'>
      <div className='new-user-grid'>
        <AddUser isLoading={isLoading} />
      </div>
      <div className='edit-user-grid'>
        <EditUser
          userList={userList}
          getUsers={getUsers}
          isLoading={isLoading}
        />
      </div>
      <div className='edit-inventory-grid'>
        <EditInventory inventory={inventory} isLoading={isLoading} />
      </div>
    </div>
  );
}
