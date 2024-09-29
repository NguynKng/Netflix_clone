import { useState, useEffect } from "react";
import useContentStore from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null);
    const { contentType } = useContentStore();

    useEffect(() => {
        let intervalId;

        const getTrendingContent = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/trending`);
                setTrendingContent(response.data.content);
            } catch (error) {
                console.error("Error fetching trending content:", error);
            }
        };

        // Fetch trending content immediately on mount
        getTrendingContent();

        // Set an interval to fetch new trending content every 5 seconds
        intervalId = setInterval(() => {
            getTrendingContent();
        }, 5000); // Changed to 5000 milliseconds (5 seconds)

        // Cleanup function to clear the interval on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, [contentType]);

    return { trendingContent };
};

export default useGetTrendingContent;