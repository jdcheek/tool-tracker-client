import React, { useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../App.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Nav, Navbar } from "react-bootstrap";

const Navigation = (props) => {
  const mountedRef = useRef(true);
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const userAuth = async () => {
    try {
      const res = await axios.get(
        "https://infinite-stream-86590.herokuapp.com/auth/status",
        {
          withCredentials: true,
        }
      );
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
      const res = await axios.get(
        "https://infinite-stream-86590.herokuapp.com/auth/logout",
        {
          withCredentials: true,
        }
      );
      setCurrentUser({ isLoggedIn: false, isAdmin: false, username: null });
      history.push("/login");
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      className='nav-bar'>
      <Navbar.Brand className='brand' href='/tools'>
        Tool Tracker
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        {currentUser.isLoggedIn ? (
          <Nav className='ml-auto'>
            <Nav.Link href='/tools'>Search Tools</Nav.Link>
            <Nav.Link href='/account'>My Account</Nav.Link>
            {currentUser.isAdmin ? (
              <Nav.Link href='/dashboard'>Admin Dashboard</Nav.Link>
            ) : null}
            <Nav.Link onClick={logOut}>Log Out</Nav.Link>
          </Nav>
        ) : (
          <Nav className='ml-auto'>
            <Nav.Link href='/login'>Log In</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;

//TODO fix router
