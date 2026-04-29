const express = require("express")
const router = express.Router()

const {addProduct, getProducts, getProductById, deleteProduct} =  require("../controllers/product.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.get("/", getProducts)
router.post("/add", authMiddleware, addProduct)
router.get("/:id", getProductById)
router.delete("/:id", authMiddleware, deleteProduct)

module.exports = router