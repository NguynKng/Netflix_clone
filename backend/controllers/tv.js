const { fetchFromTMDB } = require('../services/tmdb')

const getTrendingTVShow = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US")
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        return res.status(200).json({content: randomMovie, success: true, })
    } catch (error) {
        console.error("Error fetching trending movies:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

const getTVShowTrailer = async (req, res) => {
    try {
        const { id } = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        return res.status(200).json({content: data.results, success: true})
    } catch (error) {
        console.error("Error fetching trailer movies:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

const getTVShowDetail = async (req, res) => {
    try {
        const { id } = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        return res.status(200).json({content: data, success: true})
    } catch (error) {
        console.error("Error fetching detail movies:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

const getSimilarTVShow = async (req, res) => {
    try {
        const { id } = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        return res.status(200).json({content: data.results, success: true})
    } catch (error) {
        console.error("Error fetching similar movies:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

const getTVShowByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        return res.status(200).json({content: data.results, success: true})
    } catch (error) {
        console.error("Error fetching movies by category:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

const getTVShowCredit = async (req,res) => {
    try {
        const { id } = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`)
        return res.status(200).json({content: data, success: true})
    } catch (error) {
        console.error("Error fetching credit movies:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

const getTVShowEpisode = async (req,res) => {
    try {
        const { id, season_number } = req.params
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}?language=en-US`)
        return res.status(200).json({content: data, success: true})
    } catch (error) {
        console.error("Error fetching episode movies:", error.message)
        return res.status(500).json({message: 'Internal server error', success: false})
    }
}

module.exports = { 
    getSimilarTVShow,
    getTVShowByCategory,
    getTrendingTVShow,
    getTVShowDetail,
    getTVShowTrailer,
    getTVShowCredit,
    getTVShowEpisode
}