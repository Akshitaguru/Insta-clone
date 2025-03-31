import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile/:id',
        element:  <Profile />,
      },
     
      {
        path: '/account/edit',
        element: <EditProfile />,
      },

      {
        path: '/chat',
        element: <ChatPage />,
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* Add a dynamic route for the profile */}
          <Route path="profile/:id" element={<Profile />} />
          <Route path="/account/edit" element={<EditProfile />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;