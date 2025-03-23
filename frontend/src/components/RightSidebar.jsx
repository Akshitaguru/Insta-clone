import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux';

import store from '@/redux/store';

const RightSidebar = () => {
  // const { user } = useSelector(store=>store.auth);
  return (
    <div>
      {/* <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.profilepicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
         <h1>{user?.username}</h1>
         {user?._id === post.author._id && <Badge variant="secondary">Author</Badge>}
          </div>
        </div> */}
    </div>
  )
}

export default RightSidebar
