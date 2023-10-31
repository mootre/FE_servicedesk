import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { async } from "rxjs";

interface Responsebody{
  id:string;
  fullname:string;
  auth:string;
}

export const authOptions={
    session:{
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
           const res = await fetch("http://10.15.1.20:4000/user/login",{
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {"Content-Type":"application/json"}
           })
           const response = await res.json()
           const user:Responsebody = {
            id:response.id,
            fullname:response.fullname,
            auth:response.auth
           }           
           if (res.ok && user) {
            return {...user,response}
          } else {
            return null;
          }
          }
        })
      ],
      callback:{
        async session({session,user}){
            console.log("callback");
            return session;
        }
      }
}