import { AppBar, Avatar, Box, Button, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PaymentIcon from '@mui/icons-material/Payment';
import LoginIcon from '@mui/icons-material/Login';

const UserNavbar = () => {
  const [user, setUser] = useState(null);

  const navigate=useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
            <h3>FLIPCART</h3>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/"><Button variant='contained'>View Product</Button></Link>&nbsp;&nbsp;
          <Link to="/ct"><Button variant='contained' startIcon={<ShoppingCartIcon />}>My Cart</Button></Link>&nbsp;&nbsp;
          <Link to='/py'><Button variant='contained' startIcon={<PaymentIcon/>}>Payment</Button></Link>&nbsp;&nbsp;
          <Link to='/lg'><Button variant='contained' startIcon={<LoginIcon/>}>Login</Button></Link>&nbsp;&nbsp;
          <Link to='/sg'><Button variant='contained'>SignUp</Button></Link>&nbsp;&nbsp;

          <Box sx={{ flexGrow:1 }}/>
          
        <Avatar onClick={() => navigate("/pr")} sx={{ cursor: "pointer" }}> {user?.username?.charAt(0).toUpperCase() ?? "U"}
</Avatar>

       
        </Toolbar>
      </AppBar>
      <br /><br /><br />
    </div>
  )
}

export default UserNavbar;
