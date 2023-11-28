"use client"

import React from 'react'
import { useRef } from 'react'; 
import { signIn } from "next-auth/react";

export default function page() {
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const handleSubmit = ()=>{
        signIn("credentials",{
            username: username.current?.value,
            password: password.current?.value,
            redirect: true,
            callbackUrl: '/'
        })
    }

  return (
    <div>
        <label>username</label>
        <input name='username' id='username' type='text' ref={username} />
        <label>password</label>
        <input name='password' id='password' type='password'ref={password}/>
        <button type='button' onClick={handleSubmit}>login</button>
    </div>
  )
}