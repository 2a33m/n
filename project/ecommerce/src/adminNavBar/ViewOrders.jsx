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
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdminNavBar from "./AdminNavBar";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:3000/vieworders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    axios
      .post("http://localhost:3000/update-order-status", { orderId, status: newStatus })
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          )
        );
        alert(`Order ${orderId} status updated to ${newStatus}`);
      })
      .catch((err) => console.error("Error updating order status:", err));
  };

  const handleCancelOrder = (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    updateOrderStatus(orderId, "Cancelled");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Cancelled":
        return "red";
      case "Out For Delivery":
        return "blue";
      default:
        return "orange";
    }
  };

  return (
    <div>
      <AdminNavBar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Manage Orders
        </Typography>

        {orders.length > 0 ? (
          orders.map((order) => (
            <Accordion key={order.orderId} sx={{ mb: 2 }} component={Card}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                  <Typography variant="h6">Order ID: {order.orderId}</Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      Status:{" "}
                      <span style={{ fontWeight: "bold", color: getStatusColor(order.status) }}>
                        {order.status}
                      </span>
                    </Typography>
                    <Select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                      size="small"
                      sx={{ minWidth: 160 }}
                      onClick={(e) => e.stopPropagation()}
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
                    User: {order.user?.username || "Unknown"} ({order.user?.email || "N/A"})
                  </Typography>

                  {order.user?.address && (
                    <Typography variant="body2" gutterBottom>
                      Address: {order.user.address}
                    </Typography>
                  )}

                  {order.createdAt && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                  )}

                  <Typography variant="body2" sx={{ mb: 2, mt: 2 }}>
                    Products:
                  </Typography>

                  <List dense>
                    {order.products?.length > 0 ? (
                      order.products.map((product, index) => (
                        <ListItem
                          key={index}
                          disableGutters
                          sx={{
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            borderBottom: "1px solid #eee",
                            pb: 1,
                          }}
                        >
                          {/* Product Image */}
                          <img
                            src={product.image}
                            alt={product.productname}
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 4,
                              border: "1px solid #ccc",
                            }}
                          />

                          {/* Product Details */}
                          <Box>
                            <Typography variant="subtitle1">
                              {product.productname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ₹{product.price ? product.price.toFixed(2) : "0.00"} &nbsp; | &nbsp;
                              Quantity: {product.quantity || 1}
                            </Typography>
                          </Box>
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No products found for this order.
                      </Typography>
                    )}
                  </List>

                  {order.status !== "Cancelled" && order.status !== "Completed" && (
                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleCancelOrder(order.orderId)}
                      >
                        Cancel Order
                      </Button>
                    </Box>
                  )}
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
      </Container>
    </div>
  );
};

export default ViewOrders;
