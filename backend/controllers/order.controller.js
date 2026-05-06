const Order = require("../models/order.model")
const Cart = require("../models/cart.model")

const createOrder = async(req, res)=> {

    console.log("🚀 NEW createOrder RUNNING");
    try {
        const userId = req.user.id
        const cartItems = await Cart.find({user: userId}).populate("product")

        if(cartItems.length === 0 ){
            return res.status(400).json({
                message:"cart is empty"
            })
        }
        // calculate total
        let totalAmount = 0;

       const items = cartItems.map((item) => {
        totalAmount += item.product.price * item.quantity;

        return {
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            quantity: item.quantity,
        };
        });

        //create order

        const order = await Order.create({
            user:userId,
            items,
            totalAmount
        })

        // clear Cart 
        await Cart.deleteMany({user:userId})

        res.status(201).json({
            message:"order place successfully",
            order
        })
        console.log("CREATE USER:", userId);
        console.log("ORDER ITEMS:", items);
        console.log("CART ITEMS:", cartItems);
        
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }

}

const getOrder = async (req,res)=>{
    try {
        const userId = req.user.id

        const orders = await Order.find({user: userId}).populate("items.product")

        res.status(200).json({
            orders,
        })

        console.log("FETCH USER:", userId);
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

module.exports = {createOrder, getOrder}

