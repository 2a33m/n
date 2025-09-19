import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [user, setUser] = useState({  email:"",  password:"" })
  const navigate = useNavigate()

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const addHandler = () => {
    axios.post("http://localhost:3000/add", user)
      .then((res) => {
        alert("Signup successful!")
        localStorage.setItem("user", JSON.stringify(res.data))
        navigate("/pr")
      })
  }

  return (
    <div>
      <h1>SIGNUP</h1>
      <TextField label='email' name='email' value={user.email} onChange={inputHandler} /><br /><br />
      <TextField label='password' name='password' type='password' value={user.password} onChange={inputHandler} /><br /><br /> 
      <Button variant='contained' onClick={addHandler}>SignUp</Button>
    </div>
  )
}

export default Signup
