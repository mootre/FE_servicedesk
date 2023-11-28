"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";
import { useSessionLogin } from "@/components/function/function";

export default function Home() {
  useSessionLogin(); // Use the custom hook
  const { data: session } = useSession();

  /*useEffect(() => {
    if (session === undefined) {
      // Session is still loading, do nothing
      console.log("Loading...");
    } else if (!session) {
      console.log("1");
      signIn();
    } else {
      console.log("2");
    }
  }, [session]);*/

  return (
    <>
      {session ? (
        <p>username : {session?.user?.fullname}</p>
      ) : (
       null
      )}
    </>
  );
}
