//"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'
import { LoginButton,LogoutButton } from '@/src/lib/components'
import { useSession } from 'next-auth/react'

async function Topbar() {
  //const {data : session} = useSession(); 
  const session = await getServerSession(authOptions);
  //console.log(session);
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/vercel.svg" alt="logo" width={28} height={28} />
        <p className="font-bold text-gray-700 max-w-xs:hidden">
          Service Desk System
        </p>
      </Link>
      <div>
      {session?
        <>
          <LogoutButton/>
        </>
          :
          <>
          <LoginButton/>
          </>
        }
      </div>
    </nav>
  );
}

export default Topbar;
