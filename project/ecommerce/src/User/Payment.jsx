import React, { useState } from "react";
import { Box, TextField, MenuItem, Button, Typography, Card, CardContent, CardMedia, imageListClasses } from "@mui/material";
import UserNavbar from "./UserNavbar";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  // Access the product data from the navigation state
  const product = location.state?.product;

  const handleMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

 // inside Payment.jsx

const handlePayment = async () => {
  // Assume user details are stored in a global state or fetched from a token
  // For this example, we'll hardcode some user data
  const userDetails = {
    userId: "user-12345", 
    username: "Sample User",
    email: "user@example.com",
  };

  const orderData = {
    orderId: "ORD" + Date.now(),
    user: userDetails, // Add user details
    products: [
      {
        productname: product.title,
        price: product.price,
        quantity: 1, // Assume a quantity of 1 for now
        image: product.image,
      },
    ],
    paymentId: paymentMethod === "COD" ? "Cash on Delivery" : inputValue,
    status: "Pending", // Set initial status
  };

  try {
    await axios.post("http://localhost:3000/addorder", orderData);
    alert(`Payment with ${paymentMethod} successful!`);
    navigate("/");
  } catch (err) {
    console.error("Error processing payment:", err);
    alert("Payment failed. Please try again.");
  }
};

  return (
    <Box sx={{ p: 3 }}>
      <UserNavbar />
      <Typography variant="h4" sx={{ mb: 2 }}>Payment Page</Typography>

      {/* Display product details if they exist */}
      {product && (
       <img src={product.image}/>
  
      )}
     
<p>{product.title} </p>
<p>{product.description} </p>
<h3 color='error'>{product.price}</h3>
      <Typography variant="h6">Select Payment Option</Typography>
      <TextField
        select
        label="Payment Method"
        value={paymentMethod}
        onChange={handleMethodChange}
        helperText="Please select your payment method"
        sx={{ m: 2, width: "30ch" }}
      >
        <MenuItem value="UPI">UPI</MenuItem>
        <MenuItem value="Card">Credit/Debit Card</MenuItem>
        <MenuItem value="COD">Cash on Delivery</MenuItem>
      </TextField>
      <br /><br />

      {paymentMethod === "UPI" && (
        <TextField
          label="Enter UPI ID"
          value={inputValue}
          onChange={handleInputChange}
          required
        />
      )}

      {paymentMethod === "Card" && (
        <TextField
          label="Enter Card Number"
          value={inputValue}
          onChange={handleInputChange}
          required
        />
      )}

      {paymentMethod === "COD" && (
        <Typography variant="body1" sx={{ m: 2 }}>
          You will pay upon delivery.
        </Typography>
      )}

      <br />
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        sx={{ m: 2 }}
      >
        Proceed to Pay
      </Button>
    </Box>
  );
};

export default Payment;