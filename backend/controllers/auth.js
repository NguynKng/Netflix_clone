const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const generateTokenAndSetCookie = require('../utils/generateToken')

const signup = async (req, res) => {
    try {
        const { username, password, email, confirmPassword } = req.body
        if (!username || !password || !email || !confirmPassword)
            return res.status(400).json({success: false, message: 'All fields are required'})

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //Check valid email
        if (!emailRegex.test(email))
            return res.status(400).json({success: false, message: 'Invalid email.'})
        else{
            const existingEmail = await User.findOne({email: email})
            if (existingEmail)
                return res.status(400).json({success: false, message: 'Email already exists.'})
        }
        
        //check existing username
        const existingUsername = await User.findOne({username: username})
        if (existingUsername)
            return res.status(400).json({success: false, message: 'Username is already exists.'})

        if (password.length < 6)
            return res.status(400).json({success: false, message: 'Password must be at least 6 characters long'})
        else{
            if (password !== confirmPassword)
                return res.status(400).json({success: false, message: 'Passwords do not match.'})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

        const newUser = new User({
            username: username, 
            password: hashedPassword, 
            email: email,
            image: image
        })

        generateTokenAndSetCookie(newUser._id, res)

        await newUser.save()
        return res.status(201).json({
            success: true, 
            user: {...newUser._doc,},
        })

    } catch (error) {
        console.error("Error in signup controller:", error.message)
        return res.status(500).json({message:'Internal server error', success: false})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        
        if (!user)
            return res.status(400).json({success: false, message: 'Invalid username or password'})
        
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if(!isPasswordCorrect)
            return res.status(400).json({success: false, message: "Invalid username or password"})
        
        generateTokenAndSetCookie(user._id, res)

        return res.status(200).json({
            success: true,  
            user: {...user._doc}, 
        })
    } catch (error) {
        console.error("Error in login controller:", error.message)
        return res.status(500).json({message:'Internal server error', success: false})
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('jwt-netflix')
        return res.status(200).json({message: "Logged out successfully.", success: true})
    } catch (error) {
        console.error("Error in logout controller:", error.message)
        return res.status(500).json({message:'Internal server error', success: false})
    }
}

const authCheck = (req, res) => {
    try {
        return res.status(200).json({success: true, user: req.user})
    } catch (error) {
        console.log("Error in authCheck controller:" + error.message)
        return res.status(200).json({success: false, message: "Internal server error"})
    }
}

module.exports = {
    signup, login, logout, authCheck
}