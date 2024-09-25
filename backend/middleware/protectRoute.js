const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/envVars')
const User = require('../models/user')

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"]
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token not found.', success: false })
        }

        const decoded = jwt.verify(token, SECRET_KEY)
        if (!decoded){
            return res.status(403).json({ message: 'Not authorized, invalid token.', success: false })
        }

        const user = await User.findById(decoded.userId).select("-password")
        if (!user){
            return res.status(404).json({ message: 'User not found.', success: false })
        }

        req.user = user

        next()
    }catch(err){
        console.error("Error in protectRoute middleware:", err.message)
        return res.status(403).json({ message: 'Internal server error.', success: false })
    }
}

module.exports = protectRoute