import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const Account = () => {
  const { currentUser } = useContext(UserContext);
  const mountedRef = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState({
    username: "",
    toolsCheckedOut: [],
  });

  const getAccountInfo = async () => {
    try {
      const res = await axios.get(`${process.env.SERVER}/auth/status/`, {
        withCredentials: true,
      });
      if (mountedRef.current) {
        setAccount({
          username: res.data.username,
          toolsCheckedOut: res.data.toolsCheckedOut,
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkInItem = async (e, tool) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line
      const inv = await axios.post(
        `${process.env.SERVER}/inventory/update/status/${tool.id}`,
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
        `${process.env.SERVER}/user/tools`,
        {
          id: tool.id,
          tool_number: tool.tool_number,
          location: tool.location,
          user: currentUser.username,
          checkIn: true,
        },
        { withCredentials: true }
      );
      getAccountInfo();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccountInfo();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h2>Account</h2>
      <p>Username: {account.username}</p>
      <p>Change Password</p>
      <h4>
        {account.toolsCheckedOut.length === 0 ? "No " : null}Tools Checked Out
      </h4>
      <ul>
        {account.toolsCheckedOut.map((tool) => (
          <li key={Math.random()}>
            Tool: {tool.tool_number} Location: {tool.location.bin}-
            {tool.location.shelf}
            <button onClick={(e) => checkInItem(e, tool)}>Check In</button>
          </li>
        ))}
      </ul>
      <p>Coming Soon...</p>
      <p>Report Damaged Tool</p>
    </div>
  );
};

export default Account;
