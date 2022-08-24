import { Navigate, Outlet } from "react-router-dom";
import QueryNavLink from "../../components/QueryNavLink";
import './AuthLayout.scss';

const AuthLayout = () => {
  let hasToken = false;
  // Check user has JWT token.
  localStorage.getItem("token") ? hasToken = true : hasToken = false
  if (hasToken) {
    // User is authenticated.
    // TODO: Check the token is not expired, or verify it with the server.
    return <Navigate to="/" />
  }

  return (
    <div className="auth-layout-container">
      <div className="auth-layout">
        <nav className="auth-nav">
          <QueryNavLink
            className={({ isActive }) => `link ${isActive ? 'active-link' : ''}`}
            to="/auth/signin"
          >
            Sign In
          </QueryNavLink>
          <QueryNavLink
            className={({ isActive }) => `link ${isActive ? 'active-link' : ''}`}
            to="/auth/signup"
          >
            Sign Up
          </QueryNavLink>
        </nav>
        <Outlet />
      </div>
    </div>
  )
};

export default AuthLayout;