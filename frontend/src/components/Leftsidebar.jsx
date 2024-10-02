import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Home } from 'lucide-react'
import React from 'react'

const sidebarItems = [
    {icon:<Home/>,text:"Home"},
    {icon:<Search/>,text:"Search"},
    {icon:<TredingUp/>,text:"Explore"},
    {icon:<MessageCircle/>,text:"Home"},
    {icon:<Heart/>,text:"Notifications"},
    {icon:<PlusSquare/>,text:"Create"},
    {icon: (
      <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
    ), text:"Profile"},
    {icon:<LogOut/>,text:"Logout"},
]

const leftsidebar = () => {
  return (
    <div>
      
    </div>
  )
}

export default leftsidebar
