const mongoose = require('mongoose')

var schema=mongoose.Schema({
    email:String,
    username:String,
    address:String,
    password:String,
    type:{ type: String, enum: ["admin", "user"], default: "user" }
})
var flipCart=mongoose.model("Signups",schema)
module.exports=flipCart