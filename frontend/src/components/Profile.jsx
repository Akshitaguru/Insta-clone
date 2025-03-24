import useGetUserProfile from "@/hooks/useGetUserProfile";
import store from "@/redux/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);


  const {userProfile} =  useSelector(store=>store.auth);
  console.log(userProfile);
  return (
    <div>
      <Avatar>
        <AvatarImage />
      </Avatar>
    </div>
  );
};

export default Profile;
