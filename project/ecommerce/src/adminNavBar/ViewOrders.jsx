import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Box,
  Container,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdminNavBar from "./AdminNavBar";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // This API call fetches all orders from your backend
    axios
      .get("http://localhost:3000/vieworders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    // This API call sends the updated status to your backend
    axios
      .post("http://localhost:3000/update-order-status", { orderId, status: newStatus })
      .then((res) => {
        // Update the state with the new status
        setOrders(
          orders.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          )
        );
        alert(`Order ${orderId} status updated to ${newStatus}`);
      })
      .catch((err) => console.error("Error updating order status:", err));
  };

  return (
    <div>
      <AdminNavBar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Manage Orders
        </Typography>
        <Box>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Accordion key={order.orderId} sx={{ mb: 2 }} component={Card}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                    <Typography variant="h6">Order ID: {order.orderId}</Typography>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" sx={{ mr: 2 }}>
                        Status:{" "}
                        <span style={{ fontWeight: 'bold' }}>{order.status}</span>
                      </Typography>
                      <Select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                        size="small"
                        sx={{ minWidth: 150 }}
                        onClick={(e) => e.stopPropagation()} // Prevents accordion from expanding
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Out For Delivery">Out For Delivery</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                      </Select>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <CardContent sx={{ pt: 0 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      User: {order.username} ({order.email})
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Products:
                    </Typography>
                    <List dense>
                      {order.products?.length > 0 ? (
                        order.products.map((product, index) => (
                          <ListItem key={index} disableGutters>
                            <ListItemText
                              primary={`${product.productname} (x${product.quantity})`}
                              secondary={`$${product.price ? product.price.toFixed(2) : "0.00"}`}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No products found for this order.
                        </Typography>
                      )}
                    </List>
                  </CardContent>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                No orders to display.
              </Typography>
            </Paper>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ViewOrders;