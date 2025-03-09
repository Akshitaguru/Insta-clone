import React from "react";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";

const useGetAllPost = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true); // React needs to be imported

    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/post/all", { withCredentials: true });
                if (res.data.success) {
                    console.log("Fetched posts:", res.data.posts);
                    dispatch(setPosts(res.data.posts));
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
