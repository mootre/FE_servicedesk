"use client";
import React, { useState,useEffect } from 'react'
import {userService} from '../api/auth'

function Login() {

    const [username,setUsername] = useState();
    const [password,setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(username)
        const response = await userService.authlogin({ username, password });
        if (response) {
            localStorage.setItem("accessToken", response.token);
            //router.push('../../menu/main.tsx');
        }else{
            localStorage.setItem("accessToken", "12345");
        }
      };


    /*//const router = useRouter();
    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
        //router.push("/");
        console.log('1234');
        }else{
        console.log('4321');
        }
    }, []);*/


  return (
    <div className="flex justify-center items-center h-screen text-gray-600">
      <div className="bg-slate-300 p-8 rounded-lg shadow-md w-full sm:w-96">
        <div className="flex justify-around items-center mb-4">
            <div className="text-right font-medium ">
              <h3 className="text-xl">
                Service Desk System
              </h3>
              <div className="text-sm">
                Aministrator
              </div>
            </div>
            <img src="/support.png" className="h-20 w-20 " alt="Support Icon"/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login