import React from 'react'
import AdminNavBar from './AdminNavBar'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';


const ViewProducts = () => {
const [product, setProduct] = useState([]);

    useEffect(() => {
      fetchCartItems();
    }, [])

     const navigate = useNavigate()

    const fetchCartItems = async () => {
    try {
      const res = await axios.get('http://localhost:3000/viewp')
      setProduct(res.data);
    } catch (err) {
      console.error('Error fetching cart items:', err)
    }
  }

    const removeFromCart = async (id) => {
    try {
      await axios.delete("http://localhost:3000/removep/"+id)
      setProduct(product.filter(val => val._id !== _id))
    } catch (err) {
      console.error('Error removing item:', err)
    }
    window.location.reload()
  
  }

  return (
    <div>
        <AdminNavBar/>
         <Grid container spacing={3}>
      {product.map((val)=>{
        return(
        <Card key={val.id} sx={{ maxWidth: 345 }}>
     <img src={val.image}/>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {val.title}
        </Typography>
         <Typography gutterBottom variant="h5" component="div" color='error'>
          {val.price}
        </Typography>
         
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {val.description}
        </Typography>
      </CardContent>
      <CardActions>
        
        <Button size="small" startIcon={<EditSharpIcon/>}  onClick={() => navigate(`/edit/${val._id}`)}>edit</Button> 
         <Button size="small" startIcon={<DeleteForeverSharpIcon/>} onClick={() => removeFromCart(val._id)} color='error' >delete</Button>
      </CardActions>
    </Card>
    )
      })}
      </Grid>
        
    </div>
  )
}

export default ViewProducts