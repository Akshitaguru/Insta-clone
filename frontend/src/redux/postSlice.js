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
            if (Array.isArray(action.payload)) {
                return { ...state, posts: action.payload }; // Explicitly return new state
            } else {
                console.error('Payload is not an array:', action.payload);
            }
        },        
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