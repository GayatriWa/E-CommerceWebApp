const Cart =  require("../models/cart.model")

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product, quantity } = req.body;

    // 🔥 check if already exists
    let cartItem = await Cart.findOne({ user: userId, product });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: userId,
        product,
        quantity,
      });
    }

    res.status(201).json({
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getCart = async(req, res) =>{
    try {
        const userId = req.user.id
        const cartItems = await Cart.find({user: userId})
        .populate("product") // fetch product details

        res.status(200).json({
            cartItems
        })
        
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

const removeCart = async (req, res) =>{
    try {
        const {id} = req.params

        const cartItem = await Cart.findByIdAndDelete(id)

        if(!cartItem){
            return res.status(404).json({
                message: "cart item not found"
            })
        }

        res.status(200).json({
            message:"item removed from cart",
            
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateQuantity = async(req, res) =>{
    try {
        const {id} = req.params
        const {quantity} = req.body

        const cartItem = await Cart.findById(id)

        if(!cartItem){
            return res.status(404).json({
                message:"cart item not found"
            })
        }
        cartItem.quantity = quantity
        await cartItem.save()


        res.status(200).json({
            message:"quantity updated", 
            cartItem
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {addToCart, getCart, removeCart, updateQuantity}