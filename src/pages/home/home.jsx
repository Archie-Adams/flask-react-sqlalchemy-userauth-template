import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Home = () => (
  <div>
    <h1>Home Page!</h1>
    <nav className='home-nav'>
      <Link to="/profile">profile</Link> |{" "}
      {/* <Link to="/expenses">Expenses</Link> */}
    </nav>
    <Outlet />
  </div>
)

export default Home;
