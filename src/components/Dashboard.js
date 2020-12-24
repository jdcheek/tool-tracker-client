import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import AddInventory from "./AddInventory";
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
    <Tabs justify defaultActiveKey='edit-inventory'>
      <Tab eventKey='edit-inventory' title='Manage Tools'>
        <EditInventory inventory={inventory} isLoading={isLoading} />
      </Tab>
      <Tab eventKey='add-inventory' title='Add New Tool'>
        <AddInventory />
      </Tab>
      <Tab eventKey='edit-user' title='Manage Users'>
        <EditUser
          userList={userList}
          getUsers={getUsers}
          isLoading={isLoading}
        />
      </Tab>
      <Tab eventKey='add-user' title='Add New User'>
        <AddUser isLoading={isLoading} getUsers={getUsers} />
      </Tab>
    </Tabs>
  );
}
