import { useState } from 'react';
import axios from 'axios';

// TODO: This is not working when functions are being passed as props.
// I would rarther not pass props anyway.
// Think about removing the react hood part of this and having them
// defined as helper functions with token stored mainly in local storage.

// TODO: Also need to make axios default header work.


function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
  };

  function removeToken() {
    localStorage.removeItem("token");
    console.log("token removed.")
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken;
