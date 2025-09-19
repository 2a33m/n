import React from 'react'
import AdminNavBar from './AdminNavBar'
import axios from 'axios'
import { useState } from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'


const ViewUsers = () => {

   var[User,SetUser]=useState([])
    axios.get("http://localhost:3000/viewsg")
    .then((res)=>{
        console.log(res.data)
        SetUser(res.data)
    })

    const delValue=(id)=>{
        axios.delete("http://localhost:3000/removesg/"+id)
        .then((res)=>{
            alert(res.data)
          window.location.reload();
        })
    }


  return (
    <div>
        <AdminNavBar/>
        <h1>User Details</h1>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          
            <TableCell align="center">   username    </TableCell>
            <TableCell align="center">   email  </TableCell>
            <TableCell align="center">   address    </TableCell>   
             <TableCell align="center">   password    </TableCell> 
             <TableCell align="center">  </TableCell>      
          </TableRow>
        </TableHead>
        <TableBody>
          {User.map((row) => (
            <TableRow>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.address}</TableCell>
               <TableCell align="center">{row.password}</TableCell>
            <TableCell align="center">
                <Button variant='contained' onClick={()=>{delValue(row._id)}}>DELETE</Button>
                 
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        
    </div>
  )
}

export default ViewUsers