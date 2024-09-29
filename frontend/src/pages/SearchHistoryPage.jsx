import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { formatDateTime } from "../utils/formattedFunction";
import Swal from 'sweetalert2';

const SearchHistoryPage = () => {
	const [searchHistory, setSearchHistory] = useState([]);

	useEffect(() => {
		const getSearchHistory = async () => {
			try {
				const res = await axios.get(`/api/v1/search/history`);
				setSearchHistory(res.data.content);
			} catch {
				setSearchHistory([]);
			}
		};
		getSearchHistory();
	}, []);

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(`/api/v1/search/history/${id}`);
			setSearchHistory(searchHistory.filter((item) => item.id !== id));
            toast.success(response.data.message)
		} catch {
			toast.error("History removed unsuccessfully");
		}
	};

    const handleDeleteAll = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete all search history permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete all!',
            cancelButtonText: 'No, cancel!',
        });
    
        if (result.isConfirmed) {
            try {
                // Assuming you have an API endpoint to delete all history
                const res = await axios.delete(`/api/v1/search/history`);
                setSearchHistory([]); // Clear local history array
                toast.success(res.data.message);
            } catch {
                toast.error("Failed to delete all search history");
            }
        }
    };

	if (searchHistory.length === 0) {
		return (
			<div className='bg-black min-h-screen text-white'>
				<Navbar />
				<div className='max-w-6xl mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-8'>Search History ({searchHistory.length})</h1>
					<div className='flex justify-center items-center h-96'>
						<p className='text-xl'>No search history found</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-black text-white min-h-screen'>
			<Navbar />

			<div className='max-w-6xl mx-auto px-4 py-8'>
                <div className="flex justify-between mb-8">
                    <h1 className='text-3xl font-bold'>Search History ({searchHistory.length})</h1>
                    <button className="bg-red-500 py-2 px-4 rounded-lg hover:bg-red-700" 
                        onClick={() => handleDeleteAll()}>
                        Delete all ({searchHistory.length})
                    </button>
                </div>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{searchHistory?.map((entry, index) => (
						<div key={index} className='relative bg-gray-800 p-4 rounded flex items-center gap-4'>
                            {entry.searchType === "movie" || entry.searchType === "tv" ? 
                                <Link to={`/watch/${entry.id}`}>
                                    <img
                                        src={entry.image ? `${SMALL_IMG_BASE_URL}${entry.image}` : '/favicon.png'}
                                        alt='History image'
                                        className='size-16 rounded-full object-cover'
                                    />
                                </Link> :
                                <img
                                    src={entry.image ? `${SMALL_IMG_BASE_URL}${entry.image}` : '/favicon.png'}
                                    alt='History image'
                                    className='size-16 rounded-full object-cover'
                                />
                            }
							<div className='flex flex-col max-w-40'>
								{entry.searchType === "movie" || entry.searchType === "tv" ? <Link to={`/watch/${entry.id}`}>{entry.title}</Link> : <span className="text-white text-lg">{entry.title}</span>}
								<span className='text-gray-400 text-sm'>{formatDateTime(entry.createAt)}</span>
							</div>
                            <span
                                className={`absolute top-0 right-0 py-1 px-2 min-w-14 text-center text-sm ${
                                    entry.searchType === "movie"
                                        ? "bg-red-600"
                                        : entry.searchType === "tv"
                                        ? "bg-blue-600"
                                        : "bg-green-600"
                                }`}
                            >
                            {entry.searchType === "tv" ? "TV" : entry.searchType === "movie" ? "Movie" : "Person"}
                            </span>
                            <Trash
                                className='absolute bottom-0 right-0 size-6 cursor-pointer hover:fill-red-600 hover:text-red-600'
                                onClick={() => handleDelete(entry.id)}
                            />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default SearchHistoryPage;