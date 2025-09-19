const mongoose = require('mongoose')

var schema=mongoose.Schema({
     image:String,
     price:String,
   title:String,
   description:String,
})
var cartproducts=mongoose.model("cart",schema)
module.exports=cartproducts