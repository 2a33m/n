import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import UserNavbar from './UserNavbar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import ShoppingBagSharpIcon from '@mui/icons-material/ShoppingBagSharp';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [product, setProduct] = useState([]);
   const navigate = useNavigate();

    useEffect(() => {
      fetchCartItems();
    }, [])

    const fetchCartItems = async () => {
    try {
      const res = await axios.get('http://localhost:3000/viewp')
      setProduct(res.data);
    } catch (err) {
      console.error('Error fetching cart items:', err)
    }
  }

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:3000/addct', product);
      console.log('Added to cart:', response.data);
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart.');
    }
  }

    const handleBuyNow = (product) => {
  if (product) {
    navigate('/py', { state: { product: product } });
  }
};

  return (
    <div>
      <UserNavbar />
       <Grid container spacing={3}>
      {product.map((val)=>{
        return(
         <Card key={val.id} sx={{ maxWidth: 345 }}>
     <img src={val.image}/>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" >
          {val.title}
        </Typography>
         <Typography gutterBottom variant="h5" component="div" color='error'>
          {val.price}
        </Typography>
         
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {val.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="small" startIcon={<AddBoxSharpIcon/>} onClick={() => handleAddToCart(val)} sx={{ marginRight: "auto" }}>Add to Cart</Button>
     <Button size="small"  startIcon={<ShoppingBagSharpIcon/>} onClick={() => handleBuyNow(val)} sx={{ marginLeft: "auto" }} color='success' >Buy now</Button>
      </CardActions>
    </Card>
    )
      })}
      
      </Grid>
    </div>
  );
};

export default ProductList
