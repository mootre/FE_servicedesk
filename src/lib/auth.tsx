import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userdetail, userlogin } from "@/app/api/user/user";

declare module "next-auth" {
  interface Session {
    user: {
      fullname: String;
      auth: String;
    };
  }
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        /*const res = await fetch("http://localhost:4000/user/login", {
          // const res = await fetch("https://melivecode.com/api/login",{
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });*/
        const response = await userlogin(credentials); // res.json();
        if (response.status === 200) {
          return response.user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth', //sign-in",
    signOut: '/auth',
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    /*async session({ session, user }) {
      console.log("session",session);
      return Promise.resolve(session);;
    },*/
    session: async ({ session }) => {
      const rs = await userdetail(session?.user?.name);
      let fullname = rs?.result?.fullname;
      let auth = rs?.result?.auth;
      session.user = {
        ...session.user,
        fullname,
        auth,
      };
      return session;
    },
  },
};
