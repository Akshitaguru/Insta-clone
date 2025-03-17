// src/redux/actions/postActions.js
import axios from "axios";

export const fetchPosts = () => async (dispatch) => {
    dispatch({ type: 'FETCH_POSTS_REQUEST' });
    try {
        const response = await axios.get("http://localhost:8000/api/v1/post/all", {
            withCredentials: true,
        });
        dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: response.data.posts });
    } catch (error) {
        dispatch({ type: 'FETCH_POSTS_FAILURE', payload: error.message });
    }
};