const { fetchFromTMDB } = require('../services/tmdb')

const getTrendingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`)
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        return res.status(200).json({content: randomMovie, success: true, })
    } catch (error) {
        console.error("Error fetching trending movies:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

const getMovieTrailer = async (req, res) => {
    try {
        const { id } = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        return res.status(200).json({content: data.results, success: true})
    } catch (error) {
        console.error("Error fetching trailer movies:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

const getMovieDetail = async (req, res) => {
    try {
        const { id } = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        return res.status(200).json({content: data, success: true})
    } catch (error) {
        console.error("Error fetching detail movies:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

const getSimilarMovies = async (req, res) => {
    try {
        const { id } = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        return res.status(200).json({content: data.results, success: true})
    } catch (error) {
        console.error("Error fetching similar movies:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

const getMoviesByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        return res.status(200).json({content: data.results, success: true})
    } catch (error) {
        console.error("Error fetching movies by category:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

const getMovieCredit = async (req, res) => {
    try {
        const { id } = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`)
        return res.status(200).json({content: data, success: true})
    } catch (error) {
        console.error("Error fetching movie credit:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

module.exports = { 
    getTrendingMovie,
    getMovieTrailer, 
    getMovieDetail, 
    getSimilarMovies,
    getMoviesByCategory,
    getMovieCredit,
 
}