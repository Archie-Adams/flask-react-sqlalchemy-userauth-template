import React, { useState } from "react";
import axios from "axios";

function SignIn({ setToken }) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  function logMeIn(event) {
    axios({
      method: "POST",
      url: "/api/auth/signin",
      data: {
        email: loginForm.email,
        password: loginForm.password
      }
    }).then((response) => {
      const token = response.data.access_token;
      setToken(token);
      window.location.href = '/'
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })

    setLoginForm(({
      email: "",
      password: ""
    }))

    event.preventDefault()
  }

  function handleChange(event) {
    const { value, name } = event.target
    setLoginForm(prevNote => ({
      ...prevNote, [name]: value
    })
    )
  }

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <form className="login">
        <input onChange={handleChange}
          type="email"
          text={loginForm.email}
          name="email"
          placeholder="Email"
          value={loginForm.email} />
        <input onChange={handleChange}
          type="password"
          text={loginForm.password}
          name="password"
          placeholder="Password"
          value={loginForm.password} />

        <div onClick={logMeIn} className="button">Submit</div>
      </form>
    </div>
  );
}

export default SignIn