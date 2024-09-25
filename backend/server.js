const express = require('express')
const { PORT, NODE_ENV } = require('./config/envVars.js')
const connectDB = require('./config/db.js')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()


app.use(express.json()) //allow us to parse req.body
app.use(cookieParser()) // Parse cookies

app.use('/api/v1', require('./routes/index.js'))

app.use('/', (req, res) => {
    res.send('API is running') // End response to prevent Express from trying to serve the file as well
})

// if (NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
    connectDB()
})