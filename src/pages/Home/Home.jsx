import React from 'react';
import { Outlet, Link } from "react-router-dom";
import "./Home.scss"

const Home = () => (
  <div>
    <h2>Home Page!</h2>
    <Outlet />
  </div>
)

export default Home;
