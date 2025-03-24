import { setUserProfile } from "@/redux/authSlice";  // Ensure correct path
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/user/${userId}/profile`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setUserProfile(res.data.user)); 
                } 
            } catch (error) {
                console.log("Error fetching profile:", error);
            } 
        };

        if (userId) fetchUserProfile();  // Fetch only if userId exists
    }, [userId, dispatch]);  // Add dispatch in dependency array

};

export default useGetUserProfile;
