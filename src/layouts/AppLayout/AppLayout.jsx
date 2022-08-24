import { Navigate, Outlet, Link } from "react-router-dom";
import axios from 'axios';
import QueryNavLink from "../../components/QueryNavLink";
import "./AppLayout.scss";

const AppLayout = ({ removeToken }) => {
  let hasToken = false;
  // Check user has JWT token.
  localStorage.getItem("token") ? hasToken = true : hasToken = false
  if (!hasToken) {
    // User is not authenticated.
    return <Navigate to="/auth/signin" />
  }

  function signOut() {
    axios({
      method: "POST",
      url: "api/auth/signout",
    })
      .then((response) => {
        removeToken();
        window.location.href = "/auth/signin";
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  return (
    <div className="app-layout">
      <div className="app-page">
        <header>
          <h1>generic app title</h1>
          <div onClick={signOut} className="button">Sign Out</div>
        </header>
        <Outlet />
      </div>
      <nav className="app-nav">
        <QueryNavLink
          className={({ isActive }) => `link ${isActive ? 'active-link' : ''}`}
          to="/home"
        >
          Home
        </QueryNavLink>
        <QueryNavLink
          className={({ isActive }) => `link ${isActive ? 'active-link' : ''}`}
          to="/profile"
        >
          Profile
        </QueryNavLink>
      </nav>
    </div>
  )
};

export default AppLayout;