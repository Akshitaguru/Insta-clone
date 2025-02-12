import React from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = () => {
  const storeData = useSelector((store) => store);
  console.log("Entire Redux store:", storeData);  // Debugging

  // ✅ Extract posts safely
  const posts = storeData?.post?.posts || [];  

  if (!Array.isArray(posts) || posts.length === 0) {
    return <p>Loading posts...</p>;  // ✅ Prevents `.map()` error
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

