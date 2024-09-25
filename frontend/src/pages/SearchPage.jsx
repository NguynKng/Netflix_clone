import { useState } from "react"
import useContentStore from "../store/content"
import Navbar from "../components/Navbar"
import { Search } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants"
import { Link } from "react-router-dom"

const SearchPage = () => {
    const [activeTab, setActiveTab] = useState("movie")
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const { setContentType } = useContentStore()

    const handleTabClick = (tab) => {
        setActiveTab(tab)
        tab === "movie" ? setContentType("movie") : setContentType("tv") 
        setSearchTerm("")
        setResults([])
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            if(searchTerm) {
                const response = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`)
                setResults(response.data.content)
            } else {
                setResults([])
            }
        } catch (error) {
            if(error.response.status === 404)
                toast.error("Nothing found, make sure you are searching under th right category")
            else
            toast.error("Something went wrong, please try again.")
        }
    }

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="container mx-auto px-6 py-8">
                <div className="flex justify-center gap-4 mb-4">
                    <button className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600": "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick("movie")}>Movies</button>

                    <button className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600": "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick("tv")} >TV Shows</button>

                    <button className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600": "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick("person")} >Person</button>
                </div>
                <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={`Search for a ${activeTab === "tv" ? "TV Show" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }`}
                        className="w-full p-3 rounded bg-gray-800 text-white"
                        autoFocus
                    />
                    <button className="p-2 rounded bg-red-600 hover:bg-red-700">
                        <Search />
                    </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.map((result)=>{
                        if(result.poster_path === null)
                            return null
                        return (
                            <div key={result.id} className="bg-gray-900 p-4 rounded shadow-md">
                                <Link to={activeTab === "person" ? "#" : `/watch/${result.id}`} className="group">
                                    <div className="overflow-hidden rounded-md">
                                        <img src={result?.profile_path === null ?  "/no_avatar.png" : ORIGINAL_IMG_BASE_URL + (result?.poster_path || result?.profile_path)} alt={result?.title || result?.name} className="h-96 w-full rounded object-cover group-hover:scale-125 transition-transform duration-500 ease-in-out" />
                                    </div>
                                    <h2 className="mt-2 text-white text-center text-2xl font-bold group-hover:text-gray-600">{result?.title || result?.name}</h2>
                                </Link>
                                {activeTab != "person" ? <h2 className="text-center mt-2">Release: {result?.release_date?.split("-")[0] || result?.first_air_date?.split("-")[0]}</h2> : ""}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchPage