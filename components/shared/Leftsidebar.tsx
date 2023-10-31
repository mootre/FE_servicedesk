"use client";
import React, { useState } from "react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function LeftSidebar() {
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-1 w-full flex-col gap-1 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-slate-400"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                height={20}
                width={20}
              ></Image>
              <p
                className={`max-lg:hidden ${
                  isActive ? "text-gray-700" : "text-gray-700 "
                }`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default LeftSidebar;
