// src/redux/postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        // Add these reducers to handle the fetch actions
        fetchPostsRequest: (state) => {
            state.loading = true;
        },
        fetchPostsSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setPosts, fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } = postSlice.actions;
export default postSlice.reducer;