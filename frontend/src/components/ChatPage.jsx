import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";

const ChatPage = () => {
  const { user, suggestedUsers } = useSelector((store) => store.auth);
  return (
    <div className="flex ml-[16%] h-screen">
      <section>
        <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
        <hr className="mb-4 border-gray-400"/>
        <div className="overflow-y-auto h-[80vh] ">
{
    suggestedUsers.map((suggestedUser) => {
        return (
            <div>
                <Avatar>
                    <AvatarImage src={suggestedUser.profilePicture} />
                    </Avatar>
                </div>
        )
    })
}
        </div>
      </section>
    </div>
  );
};

export default ChatPage;
