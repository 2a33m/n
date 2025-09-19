const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://saeemmulanthala:saeemmohamed@cluster0.yo9odwc.mongodb.net/new?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log('Connected!'))
.catch((err)=>console.log(err))