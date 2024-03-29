import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import SharebnbApi from './api';
import NavBar from './NavBar';
import RouteList from './RouteList';
import userContext from "./userContext";
import useLocalStorage from './useLocalStorage';

/** App render application
 *
 *  States:
 *    -currUser | object for user details
 *    -loadingUser | determines whether to display loading screen (bool)
 *    -accessToken | token for authorization
 *
 * App -> RouteList
 */
function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [accessToken, setAccessToken] = useLocalStorage('accessToken');

  /** updates currUser every time the token changes  */
  useEffect(function updateCurrUserInfo() {
    async function updateNewCurrUser() {
      const localStorageToken = localStorage.getItem('accessToken');
      if (!localStorageToken) {
        SharebnbApi.accessToken = "";
        setCurrUser(null);
        setLoadingUser(false);
        return;
      }
      SharebnbApi.accessToken = localStorageToken;
      const decodedTokenUsername = jwt_decode(localStorageToken).sub;
      const newCurrUser = await SharebnbApi.getUser(decodedTokenUsername);
      setCurrUser(() => ({ ...newCurrUser }));
      setLoadingUser(false);
    }
    updateNewCurrUser();
  }, [accessToken]);


  /**USER METHODS */

  /** Creates a new user and sets accessToken */
  async function signup(formData = {}) {
    const registerResp = await SharebnbApi.register(formData);
    setAccessToken(registerResp);
  }

  /** Logs in user and sets accessToken */
  async function login(formData = {}) {
    const loginResp = await SharebnbApi.login(formData);
    setAccessToken(loginResp);
  }

  /** Updates user and returns new user object */
  async function updateUser(formData = {}) {
    const updateResp = await SharebnbApi.updateUser(currUser.username, formData);
    setCurrUser(updateResp);
  }

  /** logs out user */
  function logout() {
    setAccessToken("");
    setCurrUser(null);
  }

  /**PROPERTY METHODS */

  /** Adds property */
  async function addProperty(formData={}) {
    const propResp = await SharebnbApi.addProperty(formData);
    setCurrUser(oldUser =>
      ({
        ...oldUser,
        properties: [...oldUser.properties, propResp]
      }));
  }

  /**BOOKING METHODS */

  /** Add booking */
  async function addBooking(propertyId, formData = {}) {
    const bookResp = await SharebnbApi.addBooking(propertyId, formData);
    setCurrUser(oldUser =>
    ({
      ...oldUser,
      bookings: [...oldUser.bookings, bookResp]
    }));
  }

  /** Delete booking */
  async function delBooking(bookingId) {
    await SharebnbApi.deleteBooking(bookingId);
    setCurrUser(oldUser =>
    ({
      ...oldUser,
      bookings: oldUser.bookings.filter(b => b.id !== bookingId)
    }));
  }

  if (loadingUser) return (<div>Loading...</div>);

  return (
    <div className="App d-flex flex-column align-items-center">
      <BrowserRouter>
        <userContext.Provider value={{ currUser }}>
          <NavBar logout={logout} />
          <RouteList
            login={login}
            signup={signup}
            updateUser={updateUser}
            addBooking={addBooking}
            delBooking={delBooking}
            addProperty={addProperty}
          />
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
