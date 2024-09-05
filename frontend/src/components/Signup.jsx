
import axios from "axios";
import {toast} from 'sonner';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useState } from "react";

const Signup = () => {
    const [input, setInput] = useState({
        username:"",
        email:"",
        password:""
    });
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

    
    const signupHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
          const res = await axios.post('http://localhost:8000/api/v1/user/register',input, {
           
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
          });
          if(res.data.success) {
            toast.success(res.data.message);
      
          }
 
        } 
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
           
        }
    }


  //   const signupHandler = async (e) => {
  //     e.preventDefault();
  //     console.log(input);

  //     const token = Cookies.get('token');
  //      const headers = {
  //   Authorization: `Bearer ${token}`,
  // };

  //     try {
  //       const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       console.log('Response:', res);
  //       console.log('Response data:', res.data);
  //       if (res.data.success) {
  //         console.log('Token:', res.data.token);
  //         const token = res.data.token; // Assuming the token is returned in the response
  //         // Store the token in cookies or local storage
  //         document.cookie = `token=${token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  //         // or
  //         localStorage.setItem('token', token);
  //         toast.success(res.data.message);
  //       } else {
  //         console.log('Error:', res.data);
  //       }
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }
  //   };

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form onSubmit={signupHandler} className="shadow-lg flex flex-col gap-5 p-8">
        <div className='my-4'>
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">Signup to see photos and videos from your friends</p>
        </div>
        <div>
            <span className=" font-medium ">
                Username
            </span>
            <Input 
            type="text" 
            name = "username" 
            value={input.username} 
            onChange={changeEventHandler}
            className = "focus-visible:ring-transparent my-2"/>
        </div>

        <div>
            <span className=" font-medium ">
                Email
            </span>
            <Input 
            type="email" 
            name = "email" 
            value={input.email} 
            onChange={changeEventHandler}
            className = "focus-visible:ring-transparent my-2"/>
        </div>

        <div>
            <span className=" font-medium ">
                Password
            </span>
            <Input 
            type="password" 
            name = "password" 
            value={input.password} 
            onChange={changeEventHandler}
            className = "focus-visible:ring-transparent my-2"/>
        </div>

           <Button type="submit">
            Signup
           </Button>
      </form>
    </div>
  );
}

export default Signup;
