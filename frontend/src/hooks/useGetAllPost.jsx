import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";

const useGetAllPost = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/post/all", { withCredentials: true });
                console.log("API response data:", res.data);
                if (res.data.success) {
                    console.log("Fetched posts:", res.data.post); // Updated to match the response structure
                    dispatch(setPosts(res.data.post)); // Ensure this matches your Redux setup
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllPost();
    }, [dispatch]);

    return { loading };
};

export default useGetAllPost;