//importing
const express=require("express")
require("./connection")
var flipCartModel=require("./model/signup")
var cartModel=require("./model/carts")
const ProductModel = require('./model/productdetails')
var orderdetails = require('./model/orders'); 
var cors = require('cors')


//initialise
const app = express()

//midd
app.use(express.json())
app.use(cors())

// creation
app.get('/', (req, res) => {
 res.send('Hello World')
})

app.get('/trial', (req, res) => {
 res.send('This is a trail message')
})

// add user
app.post("/add", async (req, res) => {
  try {
    const newUser = new flipCartModel(req.body);
    await newUser.save();
    res.json(newUser);  // send back saved user details
  } catch (err) {
    res.status(500).send("Error saving user");
  }
});


// Add a new order
app.post("/addorder", async (req, res) => {
  try {
    const newOrder = new orderdetails(req.body);
    await newOrder.save();
    res.send("Order added successfully");
  } catch (err) {
    res.status(500).send("Error adding order");
  }
});

// View all orders
app.get("/vieworders", async (req, res) => {
  try {
    var data = await orderdetails.find();
    res.send(data);
  } catch (err) {
    res.status(500).send("Error fetching orders");
  }
});

    //view cart
    app.get("/view",async(req,res)=>{
   var data= await cartModel.find()
    res.send(data)
    }
    )

     //view user
    app.get("/viewsg",async(req,res)=>{
   var data= await flipCartModel.find()
    res.send(data)
    }
    )

    // login check
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await flipCartModel.findOne({ email: email, password: password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json(user);  // send back user details if login success
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



//add cart
app.post("/addct",async(req,res)=>{
    await cartModel(req.body).save()
    res.send("data added")
})

//add product
app.post("/addus",async(req,res)=>{
    await ProductModel(req.body).save()
    res.send("data added")
})




 //view products
     app.get("/viewp",async(req,res)=>{
   var data= await ProductModel.find()
    res.send(data)
    }
    )

    // GET one product
app.get("/viewp/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).send("Error fetching product");
  }
});




    // GET one user
app.get("/viewsg/:id", async (req, res) => {
  try {
    const product = await flipCartModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).send("Error fetching product");
  }
});

   //delete cart
    app.delete("/remove/:id", async (req, res) => {
  try {
    await cartModel.findByIdAndDelete(req.params.id)
    res.send("data deleted");
  } catch (err) {
    res.status(500).send("Error deleting data")
  }
});

//delete product
    app.delete("/removep/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id)
    res.send("product deleted");
  } catch (err) {
    res.status(500).send("Error deleting product")
  }
});

    //delete user
    app.delete("/removesg/:id", async (req, res) => {
  try {
    await flipCartModel.findByIdAndDelete(req.params.id)
    res.send("user deleted");
  } catch (err) {
    res.status(500).send("Error deleting user")
  }
});

// update user
app.put("/edit/:id", async (req, res) => {
  try {
    await flipCartModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("data updated");
  } catch (err) {
    res.status(500).send("Error updating user");
  }
});




     //update product
     app.put("/editp/:id",async(req,res)=>{
   await ProductModel.findByIdAndUpdate(req.params.id,req.body)
    res.send("data updated")
    }
    )

//port setting
app.listen(3000,()=>{
console.log("port is running")
})
