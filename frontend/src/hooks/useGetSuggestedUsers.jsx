import { setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            setLoading(true); // Set loading to true at the start
            try {
                const res = await axios.get('https://insta-clone-yurr.onrender.com/api/v1/user/suggested', { withCredentials: true });

                // Check if the response is successful and if posts is an array
                if (res.data.success) {

                    dispatch(setSuggestedUsers(res.data.users)); // Dispatch only if posts is an array
                } 
            } catch (error) {
              console.log(error)
            } 
        };
        fetchSuggestedUsers();
    }, []);

};

export default useGetSuggestedUsers;