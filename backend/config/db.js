const mongoose = require('mongoose')
const { MONGO_URI } = require('./envVars')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI)
        console.log(`MongoDB connected ${conn.connection.host}`)
    } catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB