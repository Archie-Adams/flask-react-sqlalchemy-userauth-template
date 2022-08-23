import { Navigate, Outlet, Link } from "react-router-dom";
import axios from 'axios';

const AppLayout = ({ removeToken }) => {
  let hasToken = false;
  // Check user has JWT token.
  localStorage.getItem("token") ? hasToken = true : hasToken = false
  if (!hasToken) {
    // User is not authenticated.
    return <Navigate to="/auth" />
  }

  function signOut() {
    axios({
      method: "POST",
      url: "api/auth/logout",
    })
      .then((response) => {
        removeToken();
        window.location.href = "/auth";
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  return (
    <div>
      <header className="App-header">
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <button onClick={signOut}>
          Sign Out
        </button>
      </header>
      <Outlet />
    </div>
  )
};

export default AppLayout;