import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './core/Home';
import Users from './user/Users';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import Menu from './core/Menu';

function MainRouter() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/users" Component={Users} />
        <Route path="/signup" Component={Signup} />
        <Route path="/signin" Component={Signin} />
        <Route path="/users/edit/:userId" Component={PrivateRoute}>
          <Route path="/users/edit/:userId" Component={EditProfile} />
        </Route>
        <Route path="/users/:userId" Component={Profile} />
      </Routes>
    </div>
  );
}

export default MainRouter;
