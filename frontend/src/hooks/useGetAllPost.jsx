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
            setLoading(true);
            try {
                const res = await axios.get('http://localhost:8000/api/v1/post/all', { withCredentials: true });
                console.log("API Response:", res.data); // Log the entire response
                if (res.data.success) { 
                    console.log("Posts fetched:", res.data.post); // This will log an empty array if there are no posts
                    dispatch(setPosts(res.data.post)); // Dispatch the empty array
                } else {
                    setError("Failed to fetch posts.");
                }
            } catch (error) {
                console.error("Fetch error:", error); // Log the error
                setError("An error occurred while fetching posts.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllPost();
    }, [dispatch]); // Add dispatch to the dependency array

    return { loading, error };
};

export default useGetAllPost;