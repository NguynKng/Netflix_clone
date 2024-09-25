import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import useContentStore from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from 'react-player'
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
    const { id } = useParams()
    const [trailer, setTrailer] = useState([])
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0)
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState(null)
    const [similarContent, setSimilarContent] = useState([])
    const { contentType } = useContentStore()
    const sliderRef = useRef(null)

    useEffect(() => {
        const getTrailer = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/trailer/${id}`)
                setTrailer(response.data.content)
            } catch (error) {
                if(error.message.includes('404'))
                    setTrailer([])
            } finally {
                setLoading(false)
            }
        }
        getTrailer()
    }, [id, contentType])

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/similar/${id}`)
                setSimilarContent(response.data.content)
            } catch (error) {
                if(error.message.includes('404'))
                    setSimilarContent([])
            } finally {
                setLoading(false)
            }
        }
        getSimilarContent()
    }, [id, contentType])

    useEffect(() => {
        const getDetailContent = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/detail/${id}`)
                setContent(response.data.content)
            } catch (error) {
                if(error.message.includes('404'))
                    setContent()
            } finally{
                setLoading(false)
            }
        }
        getDetailContent()
    }, [id, contentType])

    const handleNext = () => {
        if(currentTrailerIdx < trailer.length - 1)
            setCurrentTrailerIdx(currentTrailerIdx + 1)
    }

    const handlePre = () => {
        if(currentTrailerIdx > 0)
            setCurrentTrailerIdx(currentTrailerIdx - 1)
    }

    const scrollLeft = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
	};
	const scrollRight = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

    if(loading)
        return(
            <div className="min-h-screen bg-black p-10">
                <WatchPageSkeleton />
            </div>
        )

    if(!content)
        return (
            <div className="bg-black text-white h-screen">
                <div className="max-w-6xl mx-auto">
                    <Navbar />
                    <div className="text-center mx-auto px-4 py-8 h-full mt-40">
                        <h2 className="text-2xl mb-10 sm:text-5xl font-bold text-balance">Content not found</h2>
                        <Link to="/" className="text-red-500 text-3xl">Go Back Home</Link>
                    </div>
                </div>
            </div>
        )

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="mx-auto container px-4 py-8 h-full">

                {trailer.length > 0 && (
                    <>
                    <div className="max-w-7xl mx-auto flex justify-between items-center mb-4">

                        <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? "invisible" : ""}`} disabled={currentTrailerIdx === 0} onClick={handlePre}>
                            <ChevronLeft size={24} />
                        </button>

                        <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailer.length - 1 ? "invisible": ""}`} disabled={currentTrailerIdx === trailer.length - 1} onClick={handleNext}>
                            <ChevronRight size={24} />
                        </button>

                    </div>
                    <div className='aspect-video mb-8 p-2 sm:px-10 md:px-20'>
                        <ReactPlayer
                            controls={true}
                            width={"90%"}
                            height={"70%"}
                            className='mx-auto overflow-hidden rounded-lg'
                            url={`https://www.youtube.com/watch?v=${trailer[currentTrailerIdx].key}`}
                        />
                    </div>
                    </>
                )}
                
                {trailer?.length === 0 && (
                    <h2 className='text-xl text-center mt-5 mb-10'>
                        No trailers available for{" "}
                        <span className='font-bold text-red-600'>{content?.title || content?.name}</span> 😥
                    </h2>
                )}

                <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto md:text-left">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-5xl font-bold md:text-left text-center">{content?.title || content?.name}</h2>
                        <p className="mt-2 text-lg md:text-left text-center">
                            {formatReleaseDate(content?.release_date || content?.first_air_date)} | {" "}
                            {content?.adult ? (
                                <span className="text-red-600">18+</span>
                                ) : (
                                <span className="text-green-600">PG-13</span>
                            )}{" "}
                        </p>
                        <p className="mt-4 text-lg">{content?.overview}</p>
                    </div>
                    <img src={ORIGINAL_IMG_BASE_URL + content?.poster_path} alt="Poster Image" className="max-h-[600px] rounded-md" />
                </div>
                
                {similarContent.length > 0 && (
                    <div className="mt-12 max-w-6xl mx-auto relative">
                        <h3 className="text-3xl font-bold mb-4">Similar Movies / TV Shows</h3>
                        <div className="flex overflow-x-scroll scrollbar-hide gap-8 p-4 group" ref={sliderRef}>
                            {similarContent.map((item) => {
                                if (item.poster_path === null) 
                                    return null

                                return (
                                    <Link to={`/watch/${item.id}`} key={item.id} className="w-52 flex-none">
                                        <img src={SMALL_IMG_BASE_URL + item?.poster_path} alt="Poster Image" className="w-full h-80 rounded-md" />
                                        <h4 className="mt-2 text-lg font-semibold text-center">{item?.title || item?.name}</h4>
                                    </Link>
                                )
                            })}
                            <ChevronRight className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full" onClick={scrollRight} />
                            <ChevronLeft className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full" onClick={scrollLeft} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchPage;