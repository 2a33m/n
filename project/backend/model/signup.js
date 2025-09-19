const mongoose = require('mongoose')

var schema=mongoose.Schema({
    email:String,
    password:String,
    type:String
})
var flipCart=mongoose.model("Signups",schema)
module.exports=flipCart