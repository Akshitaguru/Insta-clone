import { useEffect } from 'react'
import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setMessages, setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'
import ProtectedRoutes from './components/ProtectedRoutes'
import { toast } from 'sonner';


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      },
      {
        path: '/chat',
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
])

function App() {
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user._id) {
      const socketio = io("https://insta-clone-yurr.onrender.com", {
        query: { userId: user._id },
        transports: ['websocket']
      });
    
      dispatch(setSocket(socketio));
  
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
  
      socketio.on('notification', (notification) => {
        console.log("Received notification via socket:", notification);
        dispatch(setLikeNotification(notification));
        const username = notification.userDetails?.username || "Someone";
        toast(`${username} liked your post!`);
      });
  
      socketio.on('message', (message) => {
        console.log("Received message via socket:", message);
        dispatch(setMessages(message));
        const senderUsername = message.sender?.username || "Unknown sender";
        toast(`New message from ${senderUsername}: ${message.text}`);
      });
  
      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (!user && socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, socket, dispatch]);
  

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App