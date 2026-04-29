const Product = require("../models/product.model")

const addProduct = async(req, res) => {
    try {

        const {name, price, description, category, image} = req.body

        const product = await Product.create({
            name,
            price,
            description,
            category,
            image
        })

        res.status(200).json({
            message: " product added successfully",
            product,
        })
        
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getProducts = async (req, res) =>{
    try {

        const products = await Product.find();

        res.status(200).json({
            products,
        })
        
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getProductById = async(req, res)=>{
    try {
        const {id} = req.params

        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({
                message: "product not found"
            })
        }

        res.status(200).json({
            product,
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

const deleteProduct = async(req, res) => {
    try {
        const {id} = req.params

        const product = await Product.findByIdAndDelete(id)

        if(!product){
            return res.status(404).json({
                message: "product not found"
            })
        }

        res.status(200).json({
            message:"product deleted succcessfully"
        })

    } catch (error) {
        res.status(500).json({
            error:error.message,
        })
    }
}
 module.exports = {addProduct, getProducts, getProductById, deleteProduct}