import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Account from "./components/Account";
import AddUser from "./components/AddUser";
import Dashboard from "./components/Dashboard";
import EditInventory from "./components/EditInventory";
import EditUser from "./components/EditUser";
import Inventory from "./components/Inventory";
import { UserContext } from "./components/UserContext";
import Navigation from "./components/Navigation";
import LogIn from "./components/LogIn";

function App() {
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
    isAdmin: false,
    username: null,
  });

  return (
    <div className='App'>
      <Router>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navigation />
          <main className='app-container'>
            <Route exact path='/tools' component={Inventory} />
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/account' component={Account} />
            <Route exact path='/tools/edit' component={EditInventory} />
            <Route exact path='/user/add' component={AddUser} />
            <Route exact path='/user/edit' component={EditUser} />
            <Route exact path='/dashboard' component={Dashboard} />
          </main>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
