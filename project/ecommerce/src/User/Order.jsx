// Order.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";
import UserNavbar from "./UserNavbar";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/vieworders");
      const userOrders = res.data.filter(
        (order) => order.user.userId === user._id
      );
      setOrders(userOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:3000/cancelorder/${orderId}`, {
        status: "Cancelled",
      });
      alert("Order cancelled successfully.");
      fetchOrders(); // Refresh the list
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order. Try again.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <UserNavbar />
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="body1">You have no orders yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {orders.map((order) =>
            order.products.map((product, idx) => (
              <Grid item xs={12} sm={6} md={4} key={`${order.orderId}-${idx}`}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.productname}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.productname}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{product.price}
                    </Typography>
                    <Typography variant="body2">Order ID: {order.orderId}</Typography>
                    <Typography variant="body2">Payment: {order.paymentId}</Typography>
                    <Typography variant="body2">Status: {order.status}</Typography>

                    {order.status !== "Cancelled" && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleCancelOrder(order._id)}
                        sx={{ mt: 1 }}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Order;
