import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Play, CircleAlert } from "lucide-react";
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from "../../utils/constants";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import useContentStore from "../../store/content.js";
import MovieSlider from "../../components/MovieSlider.jsx";
import { useState } from "react";
import { formatReleaseDate } from "../../utils/formattedFunction";

const HomeScreen = () => {
    const { trendingContent } = useGetTrendingContent()
    const { contentType } = useContentStore()
    const [imgLoading, setImgLoading] = useState(true)

    if (!trendingContent) 
        return (
            <div className="h-screen text-white relative">
                <Navbar />
                <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
            </div>
        )

    return (
        <>
            <div className="relative h-screen text-white">

                <Navbar />
                
                {imgLoading && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
                )}

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-black/20">
                    <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} className="absolute top-0 left-0 object-cover w-full h-full -z-50" alt="Movie Image" onLoad={() => {
                        setImgLoading(false)
                    }} />
                </div>
                
                <div className="absolute flex items-center justify-center w-full h-full top-0 sm:justify-normal left-0 md:px-16">
                    <div className="max-w-xl p-4">

                        <h1 className="text-4xl sm:text-6xl font-extrabold text-white">{trendingContent?.name || trendingContent?.title}</h1>

                        <p className="mt-2 text-lg">{formatReleaseDate(trendingContent?.release_date || trendingContent?.first_air_date)}{' '}
                          | {trendingContent?.adult ? <span className="text-red-500">18+</span> : <span className="text-green-500">PG-13</span>}</p>

                        <p className="mt-4 sm:text-xl text-lg">{trendingContent?.overview.length > 200 ? trendingContent?.overview.slice(0, 200) + "..." : trendingContent?.overview}</p> 

                        <div className="mt-8 flex gap-4">
                            <Link to={`/watch/${trendingContent.id}`} className="flex bg-white items-center rounded-lg hover:bg-white/80 text-black font-bold py-2 px-4 gap-2">
                                <Play className="fill-black" />Play
                            </Link>
                            <Link to={`/watch/${trendingContent.id}`}className="flex bg-gray-600 items-center rounded-lg hover:bg-gray-800 text-white py-2 px-4 gap-2">
                                <CircleAlert />More info
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10 bg-black py-10 text-white">
                {contentType === "movie"
                    ? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
                    : TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)}
            </div>
        </>
    )
}

export default HomeScreen;