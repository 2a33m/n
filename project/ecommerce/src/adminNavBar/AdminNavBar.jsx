import React from 'react'
import { AppBar, Avatar, Box, Button, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'

const AdminNavBar = () => {
  return (
    <div>
          <AppBar >
       <Toolbar>
        <Link to='/' style={{ color: 'black', textDecoration: 'none' }} >
      <h3>FLIPCART</h3></Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/ap">
            <Button variant='contained'>Add Product</Button>  <br />
            </Link>&nbsp;&nbsp;
             <Link to="/vp">
            <Button variant='contained'  >View Products</Button>  <br /> 
            </Link>&nbsp;&nbsp;
            <Link to='/vo'>
            <Button variant='contained'  >View Orders</Button>  <br />
            </Link>&nbsp;&nbsp;
             <Link to='/vu'>
            <Button variant='contained' >View Users</Button>  <br />
            </Link>&nbsp;&nbsp;
                 

        </Toolbar>
      </AppBar><br /><br /><br />
    </div>
  )
}

export default AdminNavBar