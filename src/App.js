import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import SharebnbApi from './api';
import NavBar from './NavBar';
import RouteList from './RouteList';
import userContext from "./userContext";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);


  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={currUser}>
          <NavBar logout={logout} />
          <RouteList login={login} signUp={signUp} updateUser={updateUser} />
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
