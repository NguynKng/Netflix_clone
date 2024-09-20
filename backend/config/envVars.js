const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    MONGO_URI : process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    SECRET_KEY: process.env.SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
    TMDB_API_KEY: process.env.TMDB_API_KEY
}