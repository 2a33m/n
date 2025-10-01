import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import ShoppingBagSharpIcon from "@mui/icons-material/ShoppingBagSharp";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
const storedUser = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get("http://localhost:3000/viewp");
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

 const handleAddToCart = async (product) => {
  try {
    if (!storedUser) {
      alert("Please login first");
      return;
    }

    const userId = storedUser._id || storedUser.id; // depending on how you store it

    const cartItem = {
      userId,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
    };

    await axios.post("http://localhost:3000/addct", cartItem);
    alert("Item added to cart");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};


  const handleBuyNow = (product) => {
    if (product) {
      navigate("/py", { state: { product: product } });
    }
  };

  return (
    <div>
      <UserNavbar />
      <Grid container spacing={3}>
        {product.map((val) => (
          <Grid item xs={12} sm={6} md={4} key={val._id}>
            <Card sx={{ maxWidth: 345 }}>
              <img src={val.image} alt={val.title} width="100%" />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {val.title}
                </Typography>
                <Typography gutterBottom variant="h5" color="error">
                  {val.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {val.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button
                  size="small"
                  startIcon={<AddBoxSharpIcon />}
                  onClick={() => handleAddToCart(val)}
                >
                  Add to Cart
                </Button>
                <Button
                  size="small"
                  color="success"
                  startIcon={<ShoppingBagSharpIcon />}
                  onClick={() => handleBuyNow(val)}
                >
                  Buy now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
