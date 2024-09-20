const express = require('express')
const { PORT } = require('./config/envVars.js')
const connectDB = require('./config/db.js')
const cookieParser = require('cookie-parser')
//const cors = require('cors');

const app = express()

// app.use(cors({
//     origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization']  // Add other headers if needed
// }));

app.use(express.json()) //allow us to parse req.body
app.use(cookieParser()) // Parse cookies

app.use('/api/v1', require('./routes/index.js'))

app.use('/', (req, res) => {
    res.send('API is running') // End response to prevent Express from trying to serve the file as well
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
    connectDB()
})