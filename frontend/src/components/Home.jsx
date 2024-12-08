import React from "react";
import RightSidebar from "./RightSidebar";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className='flex'>
      <div className='flex-grow'>
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home
