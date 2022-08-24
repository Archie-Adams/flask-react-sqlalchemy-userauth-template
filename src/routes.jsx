import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import history from './utils/history';
import useToken from './utils/useToken';

import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import AppLayout from "./layouts/AppLayout/AppLayout";

import SignIn from "./pages/SignIn/SignIn"
import SignUp from "./pages/SignUp/SignUp"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile";
import NotFound from './pages/NotFound/notFound'

function Router() {
  const { token, removeToken, setToken } = useToken();
  // TODO: NEED TO DEAL WITH TOKEN EXPIRY.
  // Store token expiry time in localstorage too.
  // Before each request check token time and if < time.now removetoken + redirect to auth.
  // After each request if a 401 unauth do the same.

  // TODO: Need to setup a formatter plus rules.
  // TODO: Need to put all tutorials followed in readme.

  return (
    <Routes history={history}>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/signin" replace />} />
        <Route path="signin" element={<SignIn setToken={setToken} />} />
        <Route path="signup" element={<SignUp setToken={setToken} />} />
      </Route>

      <Route path="/" element={<AppLayout removeToken={removeToken} />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router