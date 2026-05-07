const express = require("express")
const router = express.Router()

const User = require("../models/user.model")

const { register, login } = require("../controllers/auth.controller")

const authMiddleware = require("../middleware/auth.middleware")

router.post("/register", register)

router.post("/login", login)

router.get("/profile", authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password")

        res.status(200).json(user)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })
    }
})

module.exports = router