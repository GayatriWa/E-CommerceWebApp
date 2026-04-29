const express = require("express");
const router = express.Router()

const {addToCart, getCart, removeCart, updateQuantity} = require("../controllers/cart.controller")
const authMiddleware =  require("../middleware/auth.middleware")

router.post("/add", authMiddleware, addToCart)
router.get("/", authMiddleware ,getCart)
router.delete("/:id", authMiddleware, removeCart)
router.put("/:id",authMiddleware, updateQuantity)

module.exports = router