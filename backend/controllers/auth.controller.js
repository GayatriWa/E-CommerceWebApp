const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

const register = async (req,res) => {
    try {

        const {name, email, password} = req.body

        const existingUser = await user.findOne({email})

        if(existingUser){
            return res.status(400).json({
                message:"user already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message : "user created successfully",
            user,
        })
        
    } catch (error) {
        res.status(500).json({
            error:error.message,
        })
    }
}

const login = async (req,res) =>{
    try {
        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({
                message: "invalid password"
            })
        }

         // 3. generate token

         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

         res.status(200).json({
            message:"user login successfully",
            token
         })

    } catch (error) {
         res.status(500).json({
            error:error.message,
        })
    }
}

module.exports = {register, login}