const mongoose = require('mongoose')

var schema=mongoose.Schema({
   image:String,
   title:String,
   description:String,
   
})
var userdata=mongoose.model("userdatas",schema)
module.exports=userdata