import React, { useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "./UserContext";

const Navigation = (props) => {
  const mountedRef = useRef(true);
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const userAuth = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/status", {
        withCredentials: true,
      });
      if (mountedRef.current) {
        if (res.data) {
          setCurrentUser(res.data);
        } else {
          setCurrentUser({ isLoggedIn: false, isAdmin: false, username: null });
          history.push("/login");
        }
      } else {
        return;
      }
    } catch (err) {
      console.log(`Authorization ${err}`);
      history.push("/login");
    }
  };

  useEffect(() => {
    userAuth();
    return () => (mountedRef.current = false);
    // eslint-disable-next-line
  }, []);

  const logOut = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      setCurrentUser({ isLoggedIn: false, isAdmin: false, username: null });
      history.push("/login");
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='Nav-bar'>
      <FontAwesomeIcon
        className='crosshair-icon'
        icon={faCrosshairs}
        size='2x'
      />
      <Link className='title' to='/'>
        <h1>Tool Tracker</h1>
      </Link>
      <Link className='Nav-link Dash-link' to='/tools'>
        Tools
      </Link>
      {currentUser.isAdmin ? (
        <Link className='Nav-link' to='/dashboard'>
          Dashboard
        </Link>
      ) : (
        <></>
      )}
      {currentUser.isLoggedIn ? (
        <Link className='Nav-link' to='/account'>
          Account
        </Link>
      ) : (
        <></>
      )}

      {currentUser.isLoggedIn ? (
        <Link className='Nav-link' to='#' onClick={logOut}>
          Log Out
        </Link>
      ) : (
        <Link className='Nav-link' to='/login'>
          Log In
        </Link>
      )}
      <FontAwesomeIcon className='cog-icon' icon={faCog} size='2x' />
    </div>
  );
};

export default Navigation;

//TODO fix router
