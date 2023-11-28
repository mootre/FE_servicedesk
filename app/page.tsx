import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { NextResponse } from "next/server";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session
        ?(
          <p>This is protected content. You can access this content because you are signed in.</p>
        )
        : (
          <p>You must be signed in to view the protected content on this page.</p>
        )
        }
    </>
  );
}