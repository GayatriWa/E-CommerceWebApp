const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes")
const orderRoutes = require("./routes/order.routes")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/auth", authRoutes)

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders",orderRoutes) 

app.get("/", (req,res) =>{
    res.send("backend running")
})


app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})