import React from 'react'
import AdminNavBar from './AdminNavBar'
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const AddProduct = () => {
     //usestate 
     var[user,SetUser]=useState({image:"",price:"",title:"",description:""})

    const inputHandler=(e)=>{
        SetUser({...user,[e.target.name]:e.target.value})
        console.log(user)
    }
    const addHandler=()=>{
       axios.post("http://localhost:3000/addus",user)
       .then((res)=>{
        alert(res.data)
        window.location.reload()
       })

    }

        const delValue=(id)=>{
       axios.post("http://localhost:3000/removep/"+id,user)
       .then((res)=>{
        alert(res.data)
       })

    }
  return (
    <div>
      <AdminNavBar/><br /><br /><br />
       <TextField variant='outlined' label='image address' name='image' value={user.image}  onChange={inputHandler}/><br /><br /><br />
       <TextField variant='outlined' label='title'  name='title' value={user.title} onChange={inputHandler}/><br /><br /><br />
       <TextField variant='outlined' label='price'  name='price' value={user.price} onChange={inputHandler}/><br /><br /><br />
       <TextField variant='outlined' label='description'  name='description' value={user.description} onChange={inputHandler}/><br /><br /><br />
       <Button variant='contained' onClick={addHandler}>ADD</Button><br /><br /><br />
      
    

    </div>
  )
}

export default AddProduct