import React from 'react'
import AdminNavBar from './AdminNavBar'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';

const Edit = () => {

   const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState({
     image: '',
      price: '',
    title: '',
    description: ''
   
  });
 
    useEffect(() => {
    axios.get(`http://localhost:3000/viewp/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Error loading product", err));
  }, [id]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/editp/${id}`, product)
      .then(res => {
        alert("Product updated successfully!");
        navigate('/vp'); 
      })
      .catch(err => console.error("Error updating product", err));
  };

  return (
    <div>
      <AdminNavBar/>

      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 5 }}>
      <Typography variant="h5" gutterBottom>Edit Product</Typography>
      
      <Box display="flex" flexDirection="column" gap={2}>
       <TextField label="image URL" name="image" value={product.image} onChange={handleChange}/>
       <TextField label="Price" name="price" value={product.price} onChange={handleChange}/>
       <TextField label="Title" name="title" value={product.title} onChange={handleChange}/>
       <TextField label="Description" name="description" value={product.description} onChange={handleChange}/>
      
        <Button variant="contained" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Box>
    </Paper>

    </div>
  )
}

export default Edit
