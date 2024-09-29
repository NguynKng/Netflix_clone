import { useEffect, useRef, useState } from "react"
import useContentStore from "../store/content"
import axios from "axios"
import { SMALL_IMG_BASE_URL } from "../utils/constants"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"

const MovieSlider = ({ category }) => {
    const { contentType } = useContentStore()
    const formattedContentType = contentType == "movie" ? "Movies" : "TV Shows"
    const formattedCategories = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1)
    const [content, setContent] = useState([])
    const [showArrows, setShowArrows] = useState(false)
    const sliderRef = useRef()

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

    const scrollLeft = () => {
        if(sliderRef.current)
            sliderRef.current.scrollBy({left: -sliderRef.current.offsetWidth, behavior: "smooth"})
    }

    const scrollRight = () => {
        if(sliderRef.current)
            sliderRef.current.scrollBy({left: sliderRef.current.offsetWidth, behavior: "smooth"})
    }

    return (
        <div className="bg-black text-white relative px-5 md:px-20" onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}>
            <h1 className="text-3xl font-bold mb-4">{formattedCategories} {formattedContentType}</h1>
            {content.length > 0 && (
                <div className="flex gap-6 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
                    {content.map((item) => (
                        <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
                            <div className="rounded-lg overflow-hidden">
                                <img src={`${SMALL_IMG_BASE_URL}/${item.backdrop_path}`} alt="Movie image" className="transition-transform duration-500 ease-in-out group-hover:scale-125" />
                            </div>
                            <h1 className="text-center mt-2 font-bold group-hover:text-gray-600">{item.title || item.name}</h1>
                        </Link>
                    ))}
                </div>
            )}
            {showArrows && (
                <>
                    <button className="absolute top-1/2 -translate-y-1/2 left-6 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 text-white z-10" onClick={scrollLeft}>

                        <ChevronLeft size={24} />
                    </button>
                    <button className="absolute top-1/2 -translate-y-1/2 right-6 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-60 hover:bg-opacity-75 text-white z-10" onClick={scrollRight}>
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    )
}

export default MovieSlider