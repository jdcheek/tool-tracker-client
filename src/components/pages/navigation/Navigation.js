import React, { useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../../../App.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
  const mountedRef = useRef(true);
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const userReset = {
    isLoggedIn: false,
    isAdmin: false,
    username: null,
  };

  useEffect(() => {
    const userAuth = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER}/auth/status`,
          {
            withCredentials: true,
          }
        );
        if (mountedRef.current) {
          if (res.data) {
            setCurrentUser(res.data);
          } else {
            setCurrentUser(userReset);
            history.push("/");
          }
        } else {
          return;
        }
      } catch (err) {
        console.log(`Authorization ${err}`);
        history.push("/");
      }
    };
    userAuth();
    return () => (mountedRef.current = false);
  }, [history, setCurrentUser, userReset]);

  const logOut = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/auth/logout`,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(userReset);
      history.push("/");
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
      <Navbar.Brand className='brand' href='/'>
        Tool Tracker
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        {currentUser.isLoggedIn ? (
          <Nav className='ml-auto'>
            <Nav.Link href='/tools'>Search Tools</Nav.Link>
            <Nav.Link className='account-link' href='/dashboard'>
              Dashboard
            </Nav.Link>
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
