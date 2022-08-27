import React, { useState } from "react";
import axios from "axios";

function SignIn({ setToken }) {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: ""
  })

  function SignMeIn(event) {
    if (signInForm.email === "") {
      alert("You cannot have an empty email.")
    } else if (signInForm.password === "") {
      alert("You cannot have an empty password.")
    } else {
      axios({
        method: "POST",
        url: "/api/auth/signin",
        data: {
          email: signInForm.email,
          password: signInForm.password
        }
      }).then((response) => {
        const token = response.data.access_token;
        setToken(token);
        window.location.href = '/'
        setSignInForm(({
          email: "",
          password: ""
        }))
      }).catch((error) => {
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("There was an error processing your request, please try again.");
        }
      })
    }
    event.preventDefault()
  }

  function handleChange(event) {
    const { value, name } = event.target
    setSignInForm(prevNote => ({
      ...prevNote, [name]: value
    })
    )
  }

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <form>
        <input onChange={handleChange}
          type="email"
          text={signInForm.email}
          name="email"
          placeholder="Email"
          value={signInForm.email} />
        <input onChange={handleChange}
          type="password"
          text={signInForm.password}
          name="password"
          placeholder="Password"
          value={signInForm.password} />

        <div onClick={SignMeIn} className="button">Submit</div>
      </form>
    </div>
  );
}

export default SignIn