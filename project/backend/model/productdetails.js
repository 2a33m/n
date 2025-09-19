const mongoose = require('mongoose')

var schema=mongoose.Schema({
 image:String,
 price:String,
   title:String,
   description:String,

})
var productd=mongoose.model("productdetails",schema)
module.exports=productd