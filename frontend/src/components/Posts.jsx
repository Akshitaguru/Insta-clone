import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = () => {
    const posts = useSelector((store) => store.post.posts) || [];

    if (!posts.length) {
        return <p>Loading posts...</p>; // Show loading message instead of crashing
    }

    return (
        <div>
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
};

export default Posts;