import React, { useState, useEffect } from 'react'
import UserNavbar from './UserNavbar'
import { Avatar, Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null);
 const navigate = useNavigate();


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateHandler = () => {
    axios.put(`http://localhost:3000/edit/${user._id}`, user)
      .then((res) => {
        alert("Profile updated!");
        localStorage.setItem("user", JSON.stringify(user));
      });
       navigate('/');e
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <UserNavbar />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
        <Avatar alt={user.username} sx={{ width: 100, height: 100 }} />
      </Box>

      <h2>{user.username}</h2>

      <TextField label="Username" name="username" value={user.username} onChange={inputHandler} /><br /><br />
      <TextField label="Email" name="email" value={user.email} onChange={inputHandler} /><br /><br />
      <TextField label="Address" name="address" value={user.address} onChange={inputHandler} /><br /><br />

      <Button variant="contained" onClick={updateHandler}>Update</Button><br /><br />
      <Link to="/lg"><Button variant="contained" color="error">LogOut</Button></Link>
    </div>
  );
};

export default Profile;
