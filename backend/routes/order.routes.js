const express = require("express")
const router = express.Router()

const {createOrder, getOrder} = require("../controllers/order.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/create", authMiddleware, createOrder)

router.get("/", authMiddleware, getOrder)


module.exports = router