const express = require("express")
const router = express.Router()

const {register, login} = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")


router.post("/register", register)
router.post("/login", login)

router.get("/profile", (req, res)=>{
    res.json({
        message: "profile access",
        user: req.user,
    })
})


module.exports = router