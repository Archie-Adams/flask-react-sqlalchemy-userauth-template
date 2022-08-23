import React from "react";
import { Route, Routes } from "react-router-dom";

import { history } from './utils/history';
import useToken from './utils/useToken';

import Home from "./pages/home/home"
import SignIn from "./pages/SignIn/SignIn"
// import SignUp from "./pages/SignUp/SignUp"
import NotFound from './pages/notFound/notFound'

import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import AppLayout from "./layouts/AppLayout/AppLayout";

import Profile from "./components/Profile";

function Router() {
  const { token, removeToken, setToken } = useToken();
  // TODO: NEED TO DEAL WITH TOKEN EXPIRY.
  // Store token expiry time in localstorage too.
  // Before each request check token time and if < time.now removetoken + redirect to auth.
  // After each request if a 401 unauth do the same.

  // TODO: Need to setup a formatter plus rules.
  // TODO: Need to put all tutorials followed in readme.
  // TODO: Need to put frontend in a frontend directory.
  //       - Update package.json
  //       - Add new package.json in root with scripts.

  return (
    // TODO: What is history for?
    <Routes history={history}>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signin" element={<SignIn setToken={setToken} />} />
        {/* <Route path="signup" element={<SignUp />} /> */}
      </Route>

      <Route path="/" element={<AppLayout removeToken={removeToken} />}>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router