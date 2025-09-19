const mongoose = require('mongoose')

var schema=mongoose.Schema({
    name:String,
    password:String,
})
var flipCart=mongoose.model("FlipCartSign",schema)
module.exports=flipCart