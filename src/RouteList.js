import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ProfilePage from './ProfilePage';
import userContext from './userContext';
import BookingsPage from "./BookingsPage";
import PropertiesPage from "./PropertiesPage";
import PropertyDetail from "./PropertiesDetail";
import PropertiesList from "./PropertiesList";
import NotFound from "./NotFound";


/**
 * Component for RouteList
 *
 * App -> RoutesList -> {HomePage, LoginPage, SignUpPage, ProfilePage, CompanyPage, CompanyDetailsPage, JobsPage}
 */
function RouteList({ login, signup, updateUser, addBooking }) {
  const { currUser } = useContext(userContext);


  return (
    <Routes className="Routes">
      <Route path="/" element={<HomePage />} />
      <Route path="/properties" element={<PropertiesPage></PropertiesPage>}></Route>
      <Route path="/properties/:propertyId" element={<PropertyDetail onSubmit={addBooking} />}/>

      {!currUser
        ? <React.Fragment>
          <Route path="/login" element={<LoginPage login={login} />} />
          <Route path="/signup" element={<SignUpPage signup={signup} />} />
        </React.Fragment>
        : <React.Fragment>
          <Route path={`/users/:username/properties`} element={<PropertiesList properties={currUser.properties}/>} />
          <Route path={`/users/:username/bookings`} element={<BookingsPage addBooking/>} />
          <Route path={`/users/:username/profile`} element={<ProfilePage update={updateUser} />}/>
        </React.Fragment>
      }
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

}

export default RouteList;