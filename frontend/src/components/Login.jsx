import axios from "axios";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { fetchPosts } from "@/redux/action"; // Adjust the import path as necessary
import { useEffect } from "react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

 // Login.js

const signupHandler = async (e) => {
    e.preventDefault();
    console.log("Input State Before Request:", input);
    try {
        setLoading(true);
        const res = await axios.post(
            "https://insta-clone-yurr.onrender.com/api/v1/user/login",
            input,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        console.log("Login Response:", res.data);

        if (res.data.success) {
            dispatch(setAuthUser (res.data.user));
            dispatch(fetchPosts()); // Fetch posts after login
            navigate("/");
            toast.success(res.data.message);
            setInput({
                email: "",
                password: "",
            });
        } else {
            toast.error("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        // Error handling...
    } finally {
        setLoading(false);
    }
}

useEffect(()=> {
       if(user) {
        navigate("/");
       }
}, [])
  
  
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={signupHandler}
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">
            Login to see photos and videos from your friends
          </p>
        </div>
        <div>
          <span className=" font-medium ">Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className=" font-medium ">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        {
                    loading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit'>Login</Button>
                    )
                }
        <span className="text-center">
          Doesn't have an account?
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
