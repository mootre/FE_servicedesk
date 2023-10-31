"use client";

import React from 'react'
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Bottombar() {
  const pathname = usePathname();
  return (
    <section className='bottombar'>
      <div className="bottombar_container">
      {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-slate-400"}`}
            >
              
              <Image
                src={link.imgURL}
                alt={link.label}
                height={24}
                width={24}

              ></Image>
              
              <p
                className={`text-sm max-sm:hidden ${
                  isActive ? "text-gray-700" : "text-gray-700 "
                }`}
              >
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  )
}

export default Bottombar

/* <div className="tooltip">
              <Image
                src={link.imgURL}
                alt={link.label}
                height={24}
                width={24}

              ></Image>
              <span className='tooltiptext'> {link.label.split(/\s+/)[0]}</span></div>
              <p*/