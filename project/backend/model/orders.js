// inside orders.js

const mongoose = require('mongoose')

var schema = mongoose.Schema({
    orderId: String,
    user: {
      userId: String,
      username: String,
      email: String,
    },
    products: [{
      productname: String,
      price: Number,
      quantity: Number,
      image: String,
    }],
    paymentId: String,
    status: String
});

var orderdetails = mongoose.model("orders", schema);
module.exports = orderdetails;