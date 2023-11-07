"use client";

import {
  assetmasterassign,
  assetuserhw,
  assetusersw,
} from "@/app/api/asset/asset";
import { assignasset } from "@/app/api/assign/assign";
import { alluser } from "@/app/api/user/user";
import Pagination from "@/components/shared/Pagination";
import Rightsidebar from "@/components/shared/Rightsidebar";
import Back from "@/components/ui/Back";
import { BadgeGreen, BadgeBlue } from "@/components/ui/Badge";
import paginate from "@/utils/pagination";
import React, { useEffect, useState } from "react";
import { IoLogoSlack, IoDesktopOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface SelectedCheckboxes {
  [key: number]: { itemId: number; itemname: string }[];
}

function page() {
  const [listdata, setListdata] = useState([]);
  const [listasset, setListasset] = useState([]);
  const [listassetusersw, setListassetusersw] = useState([]);
  const [listassetuserhw, setListassetuserhw] = useState([]);
  const [fullname, setFullname] = useState(String);
  const [username, setUsername] = useState(Number);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageAsset, setCurrentPageAsset] = useState(1);
  const [popupasset, setPopupasset] = useState(false);
  const [selectedCheckboxesPerPage, setSelectedCheckboxesPerPage] = useState<SelectedCheckboxes>({});
  const pageSize = 10;
  useEffect(() => {
    async function getlistuser() {
      const response = await alluser();
      setListdata(response);
    }
    getlistuser();
  }, []);
  const handleSuccessButtonClick = (wording:string) => {
    toast.success(wording, {
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
  const handleErrorButtonClick = () => {
    toast.error("Unable to insert asset item.", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  async function getallassetuser(username:number) {
    try {
      const ressw = await assetusersw(username); // ดึง Asset HW
      const reshw = await assetuserhw(username); // ดึง Asset SW
      if (ressw.success) {
        setListassetusersw(ressw.data);
      } else {
        setListassetusersw([]);
      }
      if (reshw.success) {
        setListassetuserhw(reshw.data);
      } else {
        setListassetuserhw([]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function assigningitem(username:number, itemid:number, itemname:string, assignby:number) {
    const response = await assignasset({
      username: username,
      itemid: itemid,
      assignby: assignby,
    });
    if (response.status == 200) {
      handleSuccessButtonClick(`Inserted ${itemname} successfully.`);
      setSelectedCheckboxesPerPage({});
    } else {
      return;
    }
  }
  async function getasset() {
    const response = await assetmasterassign();
    setListasset(response);
  }
  const handleCheckboxChange = (event:React.ChangeEvent<HTMLInputElement>, itemId:number, itemname:string) => {
    const selectedCheckboxesPage:SelectedCheckboxes = { ...selectedCheckboxesPerPage }; //เก็บข้อมูลทั้งหมดใน array ที่มีอยู่ก่อนหน้า
    if (event.target.checked) {
      //selectedCheckboxesPage[currentPageAsset].push({itemId,itemname});
      selectedCheckboxesPage[currentPageAsset] = [
        ...(selectedCheckboxesPage[currentPageAsset] || []),
        { itemId, itemname },
      ]; //ถ้าข้อมูลใน array ว่างก็จะสร้าง [] เปล่าพร้อมเพิ่ม itemid เข้าไป
    } else {
      selectedCheckboxesPage[currentPageAsset] = selectedCheckboxesPage[
        currentPageAsset
      ].filter(
        (item) => !(item.itemId === itemId && item.itemname === itemname)
      ); //แสดงข้อมูลทั้งหมดที่ไม่ตรงกับ itemid
    }
    setSelectedCheckboxesPerPage(selectedCheckboxesPage);
  };
  const AssigningAsset = (funame:string, name:number) => {
    setFullname(funame);
    setUsername(name);
    getallassetuser(name);
  };
  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };
  const handlePageChangeAsset = (page:number) => {
    setCurrentPageAsset(page);
  };
  const closepopupasset = () => {
    const numbersArray = Array.from(
      { length: listasset.length / pageSize + 1 },
      (_, index) => index + 1
    ); //ลูป array ตามจำนวนหน้า Pagination
    const selectedCheckboxesPerPage:SelectedCheckboxes={}
    for (const pagenumber of numbersArray) {
      if (selectedCheckboxesPerPage && selectedCheckboxesPerPage[pagenumber]) {
        //เช็คหน้าที่มีค่า
        for (const checkbox of selectedCheckboxesPerPage[pagenumber]) {
          const { itemId, itemname } = checkbox;
          if (checkbox) {
            //console.log(itemId + ":" + itemname);
            //            handleSuccessButtonClick();
            assigningitem(username, itemId, itemname, 1);
            //เช็คค่าที่รับมา
            //console.log(checkboxes);
          }
        }
      }
    }
    getallassetuser(username);
    setPopupasset(false);
  };
  const cancelpopup = () => {
    setSelectedCheckboxesPerPage({});
    setPopupasset(false);
  };
  const openpopupasset = () => {
    setCurrentPageAsset(1);
    getasset();
    setPopupasset(true);
  };
  const handlePopupResult = (result:boolean) => {
    if (result) {
      getallassetuser(username);
    }
  };
  const paginatePost = paginate(listdata, currentPage, pageSize); //กำหนดการแสดงข้อมูลในตาราง User
  const paginatePostAsset = paginate(listasset, currentPageAsset, pageSize); //กำหนดการแสดงข้อมูลในตาราง Asset
  return (
    <>
      <Back />
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div className="grid">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-500 bg-amber-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fullname
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Authorization
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatePost.map((res:any, ind:number) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-300 dark:hover:bg-gray-600"
                    key={ind}
                    onClick={() =>
                      AssigningAsset(
                        res.Firstname + " " + res.Lastname,
                        res.Username
                      )
                    }
                  >
                    <th className="px-6 py-4">{res.Username}</th>
                    <td className="px-6 py-4">
                      {res.Firstname} {res.Lastname}
                    </td>
                    <td className="px-6 py-4">{res.Department}</td>
                    <td className="px-6 py-4">{res.Auth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              items={listdata.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div>
          {fullname ? (
            <>
              <p className="p-2 bg-amber-200 shadow-md sm:rounded-lg text-gray-500 w-full text-center mb-2">
                {fullname}
              </p>
              <div className="p-2">
                Hardware
                <section className="border border-gray-200  rounded-lg p-2">
                  {listassetuserhw.map((key:any) => (
                    <BadgeBlue
                      key={key.ItemID}
                      name={key.AssetItem}
                      itemid={key.ItemID}
                      title={"กรุณายืนยันการลบข้อมูล : "}
                      trueBtn={"Confirm"}
                      falseBtn={"Cancel"}
                      onResult={handlePopupResult}
                    />
                  ))}
                </section>
              </div>
              <div className="p-2">
                Software
                <section className="border border-gray-200  rounded-lg p-2">
                  {listassetusersw.map((key:any) => (
                    <BadgeGreen
                      key={key.ItemID}
                      name={key.AssetItem}
                      itemid={key.ItemID}
                      title={"กรุณายืนยันการลบข้อมูล : "}
                      trueBtn={"Confirm"}
                      falseBtn={"Cancel"}
                      onResult={handlePopupResult}
                    />
                  ))}
                </section>
              </div>
              <button
                type="button"
                onClick={() => openpopupasset()}
                className="float-right text-white bg-gradient-to-r inline-flex items-center from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Add Asset
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        {popupasset ? (
          <div className="fixed inset-0 flex items-center justify-center z-50 flex-col">
            <div className="w-2/5 h-auto bg-gray-50 rounded-lg shadow-md p-2 mt-10 relative flex flex-col">
              <div className="pb-4  dark:bg-gray-900">
                <label className="sr-only">Search</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="currentColor"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                  ></input>
                </div>
              </div>

              <div className="grid relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-500 bg-blue-100">
                    <tr>
                      <th scope="col" className="px-6 py-3"></th>
                      <th scope="col" className="px-6 py-3">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Item Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Asset IT
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Asset Account
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatePostAsset.map((res:any, ind:number) => (
                      
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-300 dark:hover:bg-gray-600"
                        key={ind}
                      >
                        <th className="px-6 py-4">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            checked={
                              selectedCheckboxesPerPage[currentPageAsset]?.some((item) => item.itemId === res.ItemID) || false //ถ้าค่า ItemName มีใน array[page] = true | false*/
                            }
                            onChange={(e) =>
                              handleCheckboxChange(e, res.ItemID, res.ItemName)
                            }
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          ></input>
                          <label className="sr-only">checkbox</label>
                        </th>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {res.AssetType !== "Software" ? (
                              <>
                                <IoDesktopOutline className="mr-2 inline-block" />
                                Hardware
                              </>
                            ) : (
                              <>
                                <IoLogoSlack className="mr-2 inline-block" />
                                Software
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">{res.ItemName}</td>
                        <td className="px-6 py-4">{res.AssetIT}</td>
                        <td className="px-6 py-4">{res.AssetACC}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  items={listasset.length}
                  pageSize={pageSize}
                  currentPage={currentPageAsset}
                  onPageChange={handlePageChangeAsset}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 m-2 self-end"
                  onClick={() => closepopupasset()}
                >
                  Submit
                </button>
                <button
                  className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 m-2 self-end"
                  onClick={() => cancelpopup()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <Rightsidebar />
      </div>
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
