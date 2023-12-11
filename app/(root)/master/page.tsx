"use client";

import { assetmaster } from "@/app/api/asset/asset";
import Pagination from "@/components/shared/Pagination";
import Back from "@/components/ui/Back";
import paginate from "@/utils/pagination";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoLogoSlack, IoDesktopOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { useSessionLogin } from "@/components/function/function";
import { useSession } from "next-auth/react";

function page() {
  useSessionLogin();
  const { data: session } = useSession();
  const [listdata, setListdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function getasset() {
      const response = await assetmaster();
      setListdata(response);
    }
    getasset();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const paginatePost = paginate(listdata, currentPage, pageSize);
  return (
    <>
      {session ? (
        <div>
          <Back />
          <div className="grid relative overflow-x-auto shadow-md lg:grid-cols-1 md:grid-cols-3 sm:rounded-lg ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-gray-500  dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Asset IT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Asset Account
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Serial No / License No
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {paginatePost.map((res: any, ind: number) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-300 dark:hover:bg-gray-600"
                    key={ind}
                  >
                    {res.AssetType != "Software" ? (
                      <td className="px-6 py-4">
                        <IoDesktopOutline className="mr-2 inline-block" />
                        {res.AssetType}
                      </td>
                    ) : (
                      <td className="px-6 py-4">
                        <IoLogoSlack className="mr-2 inline-block" />
                        {res.AssetType}
                      </td>
                    )}
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {res.ItemName.length > 20
                        ? res.ItemName.slice(0, 20) + "..."
                        : res.ItemName}
                    </td>
                    <td className="px-6 py-4">{res.Description}</td>
                    <td className="px-6 py-4">{res.AssetIT}</td>
                    <td className="px-6 py-4">{res.AssetACC}</td>
                    <td className="px-6 py-4">
                      {res.SerialNo !== "" ? res.SerialNo : res.Serial}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            res.AssetStatus == "Closed" ||
                            res.AssetStatus == "Reject"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }   mr-2`}
                        ></div>{" "}
                        {res.AssetStatus}
                      </div>
                    </td>
                    <td className="px-6 py-4 cursor-pointer">
                      <Link
                        href={`/asset/${res.ItemID}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <CiEdit />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            items={listdata.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      ) : null}
    </>
  );
}

export default page;
