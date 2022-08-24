import React, { useState } from "react";
import axios from "axios";

function SignUp({ setToken }) {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  })

  function SignMeUp(event) {
    // TODO: Handle checking passwords match.

    axios({
      method: "POST",
      url: "/api/auth/signup",
      data: {
        email: signUpForm.email,
        password: signUpForm.password
      }
    }).then((response) => {
      // TODO: Handle errors like duplicate accounts etc.
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

    setSignUpForm(({
      email: "",
      password: "",
      passwordConfirm: "",
    }))

    event.preventDefault()
  }

  function handleChange(event) {
    const { value, name } = event.target
    setSignUpForm(prevNote => ({
      ...prevNote, [name]: value
    })
    )
  }

  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <form>
        <input onChange={handleChange}
          type="email"
          text={signUpForm.email}
          name="email"
          placeholder="Email"
          value={signUpForm.email} />
        <input onChange={handleChange}
          type="password"
          text={signUpForm.password}
          name="password"
          placeholder="Password"
          value={signUpForm.password} />
        <input onChange={handleChange}
          type="password"
          text={signUpForm.passwordConfirm}
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={signUpForm.passwordConfirm} />

        <div onClick={SignMeUp} className="button">Submit</div>
      </form>
    </div>
  );
}

export default SignUp