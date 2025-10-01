const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: String,
  price: String,
  image: String,
  description: String,
});

module.exports = mongoose.model("cart", cartSchema);
