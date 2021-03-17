import React, { useState, useRef } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Account from "./components/pages/Account";
import Inventory from "./components/pages/inventory/Inventory";
import Landing from "./components/pages/Landing";
import LogIn from "./components/pages/LogIn";
import Navigation from "./components/pages/navigation/Navigation";
import { UserContext } from "./components/context/UserContext";

function App() {
  const mountedRef = useRef(true);

  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
    isAdmin: false,
    username: null,
    toolsCheckedOut: [],
  });

  const getAccountInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/auth/status`,
        {
          withCredentials: true,
        }
      );

      if (mountedRef.current) {
        setCurrentUser(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='App'>
      <div className='wrapper'>
        <Router>
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <Navigation />
            <div className='app-container'>
              {currentUser.isLoggedIn && (
                <div className='hide'>
                  <Account getAccountInfo={getAccountInfo} />
                </div>
              )}
              <main className='page-container'>
                <Route
                  exact
                  path='/'
                  component={() =>
                    currentUser.isLoggedIn ? <Inventory /> : <Landing />
                  }
                />
                <Route
                  exact
                  path='/tools'
                  component={() => (
                    <Inventory getAccountInfo={getAccountInfo} />
                  )}
                />
                <Route
                  exact
                  path='/dashboard'
                  component={() => <Account getAccountInfo={getAccountInfo} />}
                />
                <Route exact path='/login' component={LogIn} />
              </main>
            </div>
          </UserContext.Provider>
        </Router>
      </div>
    </div>
  );
}

export default App;
