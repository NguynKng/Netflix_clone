const jwt = require('jsonwebtoken')
const { SECRET_KEY, NODE_ENV } = require('../config/envVars')

const generateTokenAndSetCookie = (userId, res) =>{
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1d' })
    res.cookie('jwt-netflix', token, { 
        httpOnly: true, 
        maxAge: 864000000 ,
        secure: NODE_ENV !== 'development',
        sameSite: 'strict'  // 'none' for localhost development
    })
    return token
}

module.exports = generateTokenAndSetCookie