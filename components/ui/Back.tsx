import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Back() {
  return (
    <div className="flex flex-1 w-full flex-row pb-10">
      <Link href={"/"} className={"back_link p-2"}>
        <Image src={"/assets/back.svg"} height={24} width={24} alt={""}></Image>
        <p>Back</p>
      </Link>
    </div>
  );
}
