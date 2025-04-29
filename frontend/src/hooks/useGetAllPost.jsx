import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllPost = async () => {
            setLoading(true); // Set loading to true at the start
            try {
                const res = await axios.get('https://insta-clone-yurr.onrender.com/api/v1/post/all', { withCredentials: true });
                console.log("API response data:", res.data); // Log the entire response data

                // Check if the response is successful and if posts is an array
                if (res.data.success && Array.isArray(res.data.posts)) {
                    console.log("Valid posts data:", res.data.posts); // Log valid posts
                    console.log("Posts to dispatch:", res.data.posts); // Log posts before dispatching
                    dispatch(setPosts(res.data.posts)); // Dispatch only if posts is an array
                } else {
                    console.error("Invalid posts data:", res.data.posts);
                    setError("Invalid posts data received from the server.");
                }
            } catch (error) {
                // Improved error handling
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error("Fetch error:", error.response.data);
                        setError(`Error: ${error.response.status} - ${error.response.data.message || 'An error occurred'}`);
                    } else if (error.request) {
                        console.error("Fetch error: No response received", error.request);
                        setError("No response received from the server.");
                    } else {
                        console.error("Fetch error:", error.message);
                        setError(`Error: ${error.message}`);
                    }
                } else {
                    console.error("Fetch error:", error);
                    setError("An unexpected error occurred.");
                }
            } finally {
                setLoading(false); // Set loading to false after the fetch is complete
            }
        };
        fetchAllPost();
    }, [dispatch]);

    return { loading, error };
};

export default useGetAllPost;