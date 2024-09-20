import { useEffect, useState } from "react"
import useContentStore from "../store/content"
import axios from "axios"
import { SMALL_IMG_BASE_URL } from "../utils/constants"
import { Link } from "react-router-dom"

const MovieSlider = ({ category }) => {
    const { contentType } = useContentStore()
    const formattedContentType = contentType == "movie" ? "Movies" : "TV Shows"
    const formattedCategories = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1)
    const [content, setContent] = useState([])
    const [showArrows, setShowArrows] = useState(false)

    useEffect(() => {
        const getContent = async() => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/${category}`)
                setContent(response.data.content)
            } catch (error) {
                console.error("Error fetching content:", error.message)
                setContent([])
            }
        }
        getContent()
    }, [contentType, category])

    return (
        <div className="bg-red text-white relative px-5 md:px-20">
            <h1 className="text-2xl font-bold mb-4">{formattedCategories} {formattedContentType}</h1>
            {content.length > 0 && (
                <div className="flex gap-6 overflow-x-scroll">
                    {content.map((item) => (
                        <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
                            <div className="rounded-lg overflow-hidden">
                                <img src={`${SMALL_IMG_BASE_URL}/${item.backdrop_path}`} alt="Movie image" className="transition-transform duration-500 ease-in-out group-hover:scale-125" />
                            </div>
                            <h1 className="text-center mt-2">{item.title || item.name}</h1>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MovieSlider