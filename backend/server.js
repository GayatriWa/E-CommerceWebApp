const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes")
const orderRoutes = require("./routes/order.routes")
const cors = require("cors")
const blogRoutes = require("./routes/blog.routes");

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/auth", authRoutes)

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders",orderRoutes) 
app.use("/api/blogs", blogRoutes);

app.get("/", (req,res) =>{
    res.send("backend running")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})