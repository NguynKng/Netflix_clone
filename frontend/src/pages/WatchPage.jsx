import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import useContentStore from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from 'react-player'
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import { formattedRunTime } from "../utils/formattedFunction";

const WatchPage = () => {
    const { id } = useParams()
    const [trailer, setTrailer] = useState([])
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0)
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState(null)
    const [imgLoading, setImgLoading] = useState(true)
    const [similarContent, setSimilarContent] = useState([])
    const { contentType } = useContentStore()
    const [credits, setCredits] = useState([])
    const [seasonNumber, setSeasonNumber] = useState(1)
    const [seasonTVShow, setSeasonTVShow] = useState([])
    const sliderRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            try {        
                // Fetch trailer
                const trailerResponse = await axios.get(`/api/v1/${contentType}/trailer/${id}`);
                setTrailer(trailerResponse.data.content);
                
                // Fetch similar content
                const similarResponse = await axios.get(`/api/v1/${contentType}/similar/${id}`);
                setSimilarContent(similarResponse.data.content);
    
                // Fetch detailed content
                const detailResponse = await axios.get(`/api/v1/${contentType}/detail/${id}`);
                setContent(detailResponse.data.content);

                // Fetch credit
                const creditResponse = await axios.get(`/api/v1/${contentType}/credit/${id}`)
                setCredits(creditResponse.data.content)

                if (contentType === "tv") {
                    try {
                        const episodeResponse = await axios.get(`/api/v1/${contentType}/detail/${id}/season/${seasonNumber}
                        `);
                        setSeasonTVShow(episodeResponse.data.content)
                    } catch (error) {
                        console.error("Failed to fetch episodes:", error);
                        // Handle the error as needed (e.g., set an error state)
                    }
                }
            } catch (error) {
                // Check for 404 errors and set the appropriate state
                if (error.message.includes('404')) {
                    setTrailer([]);
                    setSimilarContent([]);
                    setContent();
                    setCredits([]);
                }
            } finally {
                // Set loading to false after everything has finished
                setLoading(false);
            }
        };
    
        fetchData();
    }, [id, contentType, seasonNumber]);

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
        <>
            <div className="relative text-white h-screen">

                <Navbar />

                {imgLoading && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
                )}

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-black/20">
                    <img src={ORIGINAL_IMG_BASE_URL + content?.backdrop_path} className="absolute top-0 left-0 object-cover w-full h-full -z-50" alt="Movie Image" onLoad={() => {
                        setImgLoading(false)
                    }} />
                </div>
                
                <div className="absolute flex items-center justify-center w-full h-full top-0 left-0 sm:justify-normal md:px-16">
                    <div className="max-w-xl p-4">
                        <h2 className="text-4xl font-bold">{content?.title || content?.name}</h2>
                        <p className="mt-4 text-md">
                            {content?.release_date?.split('-')[0] || content?.first_air_date?.split('-')[0]} | {" "}
                            {content?.adult ? (
                                <span className="text-red-600">18+</span>
                                ) : (
                                <span className="text-green-600">PG-13</span>
                            )} | {content?.runtime ? formattedRunTime(content.runtime) : `${content.number_of_seasons} ${content.number_of_seasons > 1 ? 'Seasons' : 'Season'}` } | {""}
                            <Link to="#" className="hover:underline">{content?.genres[0]?.name}</Link>
                        </p>
                        <p className="mt-4 text-lg">{content?.overview.length > 200 
                            ? content?.overview.slice(0, content?.overview.lastIndexOf(' ', 200)) + "..." 
                            : content?.overview
                          }</p>
                    </div>
                </div>
            </div>
            <div className="bg-black text-white">
                <div className="mx-auto container px-4 py-8">

                    {trailer.length > 0 && (
                        <div className="p-10">
                            <div className="max-w-7xl mx-auto flex justify-between items-center">

                                <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? "invisible" : ""}`} disabled={currentTrailerIdx === 0} onClick={handlePre}>
                                    <ChevronLeft size={24} />
                                </button>
                                <p className="text-3xl text-center">
                                    <span>Videos</span>
                                    {""} | {""}
                                    <span className="text-xl text-gray-500">{content?.title || content?.name}</span>
                                </p>
                                <button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailer.length - 1 ? "invisible": ""}`} disabled={currentTrailerIdx === trailer.length - 1} onClick={handleNext}>
                                    <ChevronRight size={24} />
                                </button>

                            </div>
                            <div className='aspect-auto sm:px-10 md:px-20 py-10'>
                                <ReactPlayer
                                    controls={true}
                                    width={"90%"}
                                    height={"80vh"}
                                    className='mx-auto overflow-hidden rounded-lg'
                                    url={`https://www.youtube.com/embed/${trailer[currentTrailerIdx].key}`}
                                />
                            </div>
                            <div className="text-center">
                                <p>
                                    <span className="text-2xl text-white">{trailer[currentTrailerIdx].type}</span>
                                     : {""}
                                     <span className="text-2xl text-gray-500">{trailer[currentTrailerIdx].name}</span>
                                </p>
                            </div>
                        </div>
                    )}
                    
                    {trailer?.length === 0 && (
                        <h2 className='text-xl text-center mt-5 mb-10'>
                            No trailers available for{" "}
                            <span className='font-bold text-red-600'>{content?.title || content?.name}</span> 😥
                        </h2>
                    )}
                    {contentType === "tv" && (
                        <div className="max-w-6xl mx-auto px-2 py-4">
                            <p className="text-4xl">
                                <span>Episodes</span>
                                {""} | {""}
                                <span className="text-xl text-gray-500 ">{seasonTVShow?.name}</span>
                            </p>
                            {content?.number_of_seasons > 1 && (
                                <select value={seasonNumber} onChange={(e) => setSeasonNumber(e.target.value)} className="text-white bg-transparent mt-4 text-xl focus:border-white">
                                    {content?.seasons.map((season) => (
                                        <option className="bg-black" key={season.id} value={season?.season_number}>Season {season?.season_number}</option>
                                    ))} 
                                </select>
                            )}
                            <p className="mt-4">Release year: {seasonTVShow?.air_date?.split('-')[0]}</p>
                            <p className="mt-4 text-gray-500 max-w-xl">{seasonTVShow?.overview}</p>
                            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
                                {seasonTVShow?.episodes?.map((episode)=>(
                                    <div key={episode.id}>
                                        <img className="object-cover w-full h-60" src={episode.still_path === null ? SMALL_IMG_BASE_URL + content?.poster_path : SMALL_IMG_BASE_URL + episode?.still_path} alt="Episode Image"></img>
                                        <p className="mt-2 flex justify-between">
                                            <span>{`${episode.episode_number}. ${episode.name}`}</span>
                                            <span className="text-gray-400">{formattedRunTime(episode.runtime)}</span>
                                        </p>
                                        <p className="text-xs mt-2 text-gray-400">{episode?.overview.length > 150 
                                            ? episode?.overview?.slice(0, content?.overview?.lastIndexOf(' ', 150)) + "..." 
                                            : episode?.overview}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="max-w-6xl mx-auto px-2 py-4 flex flex-col gap-4 mt-10">
                        <h2 className="md:text-3xl text-xl">More Details</h2>
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                            <div>
                                <h3 className="text-gray-500 mb-1">Watch offline</h3>
                                <p>Download and watch everywhere you go.</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 mb-1">Genres</h3>
                                <p>
                                    {content?.genres.map((genre, index) => (
                                        <span key={genre.id}>
                                            <Link to="#" className="hover:underline">{genre.name}</Link>
                                            {index < content?.genres.length - 1 && ", "}
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 mb-1">Audio</h3>
                                <p>
                                    {content?.spoken_languages.map((language, index) => (
                                        <span key={index}>
                                            {language?.name}
                                            {index < content?.spoken_languages.length - 1 && ", "}
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 mb-1">Status</h3>
                                <p>{content?.status}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 mb-1">Cast</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                                {credits?.cast.map((credit, index) => 
                                    {
                                        if (index===15)
                                            return null
                                        return credit?.known_for_department === "Acting" && (
                                            <div key={credit.id}>{credit?.name}</div>
                                        )
                                        
                                    }
                                )}
                        </div>
                        </div>
                    </div>
                    
                    {similarContent.length > 0 && (
                        <div className="max-w-6xl mx-auto relative mt-20">
                            <h3 className="text-3xl font-bold mb-4">More Like This</h3>
                            <div className="flex overflow-x-scroll scrollbar-hide gap-8 p-4 group" ref={sliderRef}>
                                {similarContent.map((item) => {
                                    if (item.poster_path === null) 
                                        return null

                                    return (
                                        <Link to={`/watch/${item.id}`} key={item.id} className="w-52 flex-none hover:text-gray-600 transition-all duration-300 ease-in-out">
                                            <img src={SMALL_IMG_BASE_URL + item?.poster_path} alt="Poster Image" className="w-full h-80 rounded-md" />
                                            <h4 className="mt-2 text-lg font-semibold text-center">{item?.title || item?.name}</h4>
                                        </Link>
                                    )
                                })}
                                <ChevronRight className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 hover:bg-red-800 text-white rounded-full" onClick={scrollRight} />
                                <ChevronLeft className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 hover:bg-red-800 text-white rounded-full" onClick={scrollLeft} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default WatchPage;