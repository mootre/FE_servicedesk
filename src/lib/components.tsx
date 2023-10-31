"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const LoginButton = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-4 p-2">
        <Image
          src="/assets/logout.svg"
          alt="Logout"
          className="cursor-pointer"
          height={24}
          width={24}
          onClick={() => signIn()}
        ></Image>
        <button onClick={() => signIn()}>Login</button>
      </div>
    </div>
  );
};

export const LogoutButton = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex cursor-pointer gap-4 p-2">
        <Image
          src="/assets/logout.svg"
          alt="Logout"
          height={24}
          width={24}
          onClick={() => signOut()}
        ></Image>
        <button onClick={() => signOut()}>Logout </button>
      </div>
    </div>
  );
};
