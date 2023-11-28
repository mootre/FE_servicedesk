import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export const converttoUrl=(_param:string)=>{
    const decodedId = decodeURIComponent(_param).replace(/ /g, "+");
    return decodedId;
}

export const Urlconverto=(_param:string)=>{
    const decodedId = decodeURIComponent(_param).replace(/\+/g, ' ');
    return decodedId;
}

export const useSessionLogin = () => {
    const { data: session } = useSession();
  
    useEffect(() => {
        if (session === undefined) {
            // Session is still loading, do nothing
            console.log("Loading...");
          } else if (!session) {
            signIn();
          } else {
          }
    }, [session]);
  };