import React, { useState } from "react";
import axios from "axios";

function SignUp({ setToken }) {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  })

  function SignMeUp(event) {
    if (signUpForm.password !== signUpForm.passwordConfirm) {
      alert("Both passwords must match!");
    } else if (signUpForm.email === "") {
      alert("You cannot have an empty email.")
    } else if (signUpForm.password === "" || signUpForm.passwordConfirm === "") {
      alert("You cannot have an empty password.")
    } else {
      axios({
        method: "POST",
        url: "/api/auth/signup",
        data: {
          email: signUpForm.email,
          password: signUpForm.password
        }
      }).then((response) => {
        const token = response.data.access_token;
        setToken(token);
        window.location.href = '/'
        setSignUpForm(({
          email: "",
          password: "",
          passwordConfirm: "",
        }))
      }).catch((error) => {
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("There was an error processing your request, please try again.");
        }
      })
    }

    event.preventDefault();
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