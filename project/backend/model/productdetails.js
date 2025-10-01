const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  image: String,
  price: String,
  title: String,
  description: String,
});

const ProductModel = mongoose.model("productdetails", schema);
module.exports = ProductModel;
