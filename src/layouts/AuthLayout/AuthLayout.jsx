import { Navigate, Outlet, Link } from "react-router-dom";
import axios from "axios";

const AuthLayout = () => {
  let hasToken = false;
  // Check user has JWT token.
  localStorage.getItem("token") ? hasToken = true : hasToken = false
  if (hasToken) {
    // User is authenticated.
    // TODO: Check the token is not expired, or verify it with the server.
    return <Navigate to="/home" />
  }

  return (
    <div>
      <nav>
        {/* TODO: Active link */}
        <Link to="/auth/signin">Sign In</Link>
        <Link to="/auth/signup">Sign Up</Link>
      </nav>
      <Outlet />
    </div>
  )
};

export default AuthLayout;