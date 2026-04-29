const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next)=>{
    try {

        // 1. get token from header

        const authHeader = req.headers.authorization

        console.log("Authorization Header:", req.headers.authorization);

        if(!authHeader){
            return res.status(401).json({
                message: "no token access denied"
            })
        }

        // 🔥 remove "Bearer "
            const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

         // 2. verify token

         const decode = jwt.verify(token , process.env.JWT_SECRET)

         // 3. attach user to request
          req.user = decode

        // 4. go to next step
        next()
        
    } catch (error) {
        res.status(401).json({
            message:"invalid token"
        })
    }
}

module.exports = authMiddleware