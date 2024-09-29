const { fetchFromTMDB } = require('../services/tmdb')
const User = require('../models/user')

const searchContent = async (req, res) => {
    try {
        const listContent = ['person', 'tv', 'movie']
        const { query, content } = req.params

        if (!listContent.includes(content))
            return res.status(400).json({ message: 'Invalid content type', success: false })

        let data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/${content}?query=${query}&include_adult=false&language=en-US&page=1`)

        if (data.results.length === 0)
            return res.status(404).json({ message: 'No results found', success: false })

        let title, image;

        if (content == 'person'){
            title = data.results[0].name
            image = data.results[0].profile_path
        }else if(content == 'movie'){
            title = data.results[0].title
            image = data.results[0].poster_path
        }else if(content == 'tv'){
            title = data.results[0].name
            image = data.results[0].poster_path
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                SearchHistory: {
                    id: data.results[0].id,
                    title: title,
                    image: image,
                    searchType: content,
                    createAt: new Date()
                }
            }
        })

        return res.status(200).json({ content: data.results, success: true })
    } catch (error) {
        console.error("Error searching for person:", error.message)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}
const getSearchHistory = (req, res) => {
    return res.status(200).json({
        success: true,
        content: req.user.SearchHistory,
    })
}

const removeAllHistory = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            SearchHistory: [] // Xóa toàn bộ mảng SearchHistory
        })
        return res.status(200).json({ message: 'All history removed successfully', success: true })
    } catch (error) {
        console.error("Error removing all history:", error.message)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

const removeHistoryById = async (req, res) => {
    const { id } = req.params
    try {
        const existingHistory = await User.find({
            SearchHistory: {
                $elemMatch: { id: id } // Tìm một phần tử trong mảng có id bằng id
            }
        });
        if(!existingHistory)
            return res.status(404).json({ message: 'History not found', success: false })

        // Convert id to integer before removing to avoid casting errors in MongoDB query
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                SearchHistory: { id: parseInt(id) }
            }
        })
        return res.status(200).json({ message: 'History removed successfully', success: true })
    } catch (error) {
        console.error("Error removing history:", error.message)
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}

module.exports = { searchContent, getSearchHistory, removeHistoryById, removeAllHistory }