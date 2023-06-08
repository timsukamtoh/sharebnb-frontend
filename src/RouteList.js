import React, { useContext } from "react";
import { Routes, Route, Navigate, NotFound } from 'react-router-dom';

import HomePage from './HomePage';
import CompanyDetailsPage from './CompanyDetailsPage';
import CompaniesPage from './CompaniesPage';
import JobsPage from './JobsPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ProfilePage from './ProfilePage';
import userContext from './userContext';



/**
 * Component for RouteList
 *
 * App -> RoutesList -> {HomePage, LoginPage, SignUpPage, ProfilePage, CompanyPage, CompanyDetailsPage, JobsPage}
 */
function RouteList({ login, signUp, updateUser }) {
  const { currUser } = useContext(userContext);


  return (
    <Routes className="Routes">
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<PropertiesPage all={true}></PropertiesPage>}></Route>
      {!currUser
        ? <React.Fragment>
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<SignUp signup={signup} />} />
        </React.Fragment>
        : <React.Fragment>
          <Route path={`/users/${currUser.username}/properties`} element={<PropertiesPage all={false}/>} />
          <Route path={`/users/${currUser.username}/bookings`} element={<BookingsPage apply={apply}/>} />
          <Route path={`/users/${currUser.username}/profile`} element={<ProfilePage update={update} />}/>
        </React.Fragment>
      }
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

}

export default RouteList;