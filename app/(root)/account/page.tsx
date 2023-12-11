"use client";

import { assetmaster, updateAssetAcc } from "@/app/api/asset/asset";
import Pagination from "@/components/shared/Pagination";
import Back from "@/components/ui/Back";
import paginate from "@/utils/pagination";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoLogoSlack, IoDesktopOutline } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { useSessionLogin } from "@/components/function/function";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  useSessionLogin();
  const { data: session } = useSession();
  const [listdata, setListdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [assetID,setAssetID]=useState();
  const [assetACC,setAssetACC]=useState('');
  const [edit,setEdit] =useState(false);
  const pageSize = 10;

  useEffect(() => {
    async function getasset() {
      const response = await assetmaster();
      setListdata(response);
    }
    getasset();
  }, [listdata]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSuccessButtonClick = () => {
    toast.success("Asset account updated successfully.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = async (id:number) => {
    try{
      if(assetACC){
        const rs = await updateAssetAcc({
          itemid: id,
          assetacc: assetACC,
          insertby: session?.user.name,
        });
        if (rs.status === 200) {
          handleSuccessButtonClick();
        }
      }
    }catch{

    }
    edit?setEdit(!edit):null;
  };
  const handleEdit = async (id:any) => {
    setEdit(!edit);
    setAssetID(id);
    setAssetACC('');
  };

  const lvdata = (listdata as any[]).filter((link) => link?.AssetACC === "");
  const paginatePost = paginate(lvdata, currentPage, pageSize);
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
                      <td className="px-6 py-4">
                        {edit?( assetID===res.ItemID &&
                          <input
                            type="text"
                            id="asset_acc"
                            name="asset_acc"
                            onChange={(e)=>setAssetACC(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                          ):null}
                      </td>
                      <td className="px-6 py-4">
                        {res.SerialNo !== "" ? res.SerialNo : res.Serial}
                      </td>
                      <td className="px-6 py-4 cursor-pointer">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>handleEdit(res.ItemID)}>Edit</button> 
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800" onClick={(e)=>handleSubmit(res.ItemID)}>Submit</button>
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default page;


/*<IoIosSave onClick={() => handleSubmit(res.ItemID)} /> */