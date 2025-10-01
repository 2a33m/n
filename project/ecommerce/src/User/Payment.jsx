import React, { useState } from "react";
import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import UserNavbar from "./UserNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const user = JSON.parse(localStorage.getItem('user'));

  const handleMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePayment = async () => {
    if (!user) {
      alert("User not logged in");
      return;
    }

    if ((paymentMethod === "UPI" || paymentMethod === "Card") && !inputValue) {
      alert("Please enter payment details");
      return;
    }

    const userDetails = {
      userId: user._id,
      username: user.username,
      email: user.email,
      address: user.address,
    };

    const orderData = {
      orderId: "ORD" + Date.now(),
      user: userDetails,
      products: [
        {
          productname: product.title,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ],
      paymentId: paymentMethod === "COD" ? "Cash on Delivery" : inputValue,
      status: paymentMethod === "COD" ? "Pending" : "Paid",
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

      {product && (
        <>
          <img src={product.image} alt={product.title} />
          <p>{product.title}</p>
          <p>{product.description}</p>
          <h3 style={{ color: 'red' }}>{product.price}</h3>
        </>
      )}

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
