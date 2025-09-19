import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setlogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginHandler = () => {
   axios.post("http://localhost:3000/login", login)
  .then((res) => {
    alert("Login successful!");
    localStorage.setItem("user", JSON.stringify(res.data)); // store logged in user

    // Check user type
    if (res.data.type === "admin") {
      navigate("/vo"); // your admin or view order page
    } else {
      navigate("/pr"); // normal user profile page
    }
  })
  .catch((err) => {
    alert("Invalid email or password");
  });
}


  return (
    <div>
      <h1>Login</h1>
      <TextField label="Email" name="email" value={login.email} onChange={inputHandler} /><br /><br />
      <TextField label="Password" type="password" name="password" value={login.password} onChange={inputHandler} /><br /><br />
      <Button variant="contained" onClick={loginHandler}>Login</Button>
    </div>
  );
};

export default Login;
