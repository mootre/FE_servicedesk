import React, { useEffect, useState } from "react";
import { assetcomponent, deletecomponent } from "@/app/api/asset/asset";
import { assigncomponent } from "@/app/api/assign/assign";
import Pagination from "@/components/shared/Pagination";
import paginate from "@/utils/pagination";
import { IoLogoSlack, IoDesktopOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { componetbyitem } from "@/app/api/asset/[...aseetid]/asset";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupConfirm from "../ui/PopupConfirm";
import { useSession } from "next-auth/react";

interface Selectboxpage {
  [key: number]: { itemId: number; itemname: string }[];
}

function AssetComponent({ assetid }: { assetid: number }) {
  const { data: session } = useSession();
  const [listasset, setListasset] = useState([]);
  const [listcomponent, setListcomponent] = useState([]);
  const [username, setUsername] = useState(Number);
  const [currentPageAsset, setCurrentPageAsset] = useState(1);
  const [popupasset, setPopupasset] = useState(false);
  const [openconfirm, setOpenconfirm] = useState(false);
  const [selectedCheckboxesPerPage, setSelectedCheckboxesPerPage] =
    useState<Selectboxpage>({});
  const [parentchild, setParentchild] = useState({ parentid: 0, childid: 0 });
  const pageSize = 10;
  useEffect(() => {
    getlistcomponent();
  }, [listcomponent]);

  async function getlistcomponent() {
    try {
      const res = await componetbyitem(assetid);
      if (res.success) {
        setListcomponent(res.data);
      }else{
        setListcomponent([]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function assigningitem(
    username: number,
    itemid: number,
    itemname: string,
    assignby: any
  ) {
    const response = await assigncomponent({
      username: username,
      itemid: assetid,
      component: itemid,
      assignby: assignby,
    });
    if (response.status === 200) {
      getlistcomponent();
      handleSuccessButtonClick(`Inserted ${itemname} successfully.`);
      setSelectedCheckboxesPerPage({});
    } else {
      return null;
    }
  }
  async function getasset() {
    const response = await assetcomponent();
    setListasset(response);
  }
  const handleSuccessButtonClick = (wording: string) => {
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
  const closepopupasset = () => {
  const numbersArray = Array.from(
      { length: listasset.length / pageSize + 1 },
      (_, index) => index + 1
    ); //ลูป array ตามจำนวนหน้า Pagination
    for (const number of numbersArray) {
      if (selectedCheckboxesPerPage && selectedCheckboxesPerPage[number]) {
        //เช็คหน้าที่มีค่า
        for (const checkbox of selectedCheckboxesPerPage[number]) {
          const { itemId, itemname } = checkbox;
          if (checkbox) {
            assigningitem(assetid, itemId, itemname, session?.user?.name);
          }
        }
      }
    }
    getlistcomponent();
    setPopupasset(false);
  };
  const openpopupasset = () => {
    setCurrentPageAsset(1);
    getasset();
    setPopupasset(true);
  };
  const cancelpopup = () => {
    setSelectedCheckboxesPerPage({});
    setPopupasset(false);
  };
  const handlePageChangeAsset = (page: number) => {
    setCurrentPageAsset(page);
  };
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: number,
    itemname: string
  ) => {
    const selectedCheckboxesPage = { ...selectedCheckboxesPerPage }; //เก็บข้อมูลทั้งหมดใน array ที่มีอยู่ก่อนหน้า
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
  const handlePopupResult = async (result: boolean) => {
    if (result) {
      const res = await deletecomponent({
        username: assetid,
        parentid: parentchild.parentid,
        childid: parentchild.childid,
        assignby: session?.user?.name,
      });
      if (res.status === 200) {
        handleSuccessButtonClick(`Remove successfully.`);
        getlistcomponent();
      }
    }
    result ? setOpenconfirm(false) : setOpenconfirm(false);
    
  };
  const openpopupconfirm = (parent: number, child: number) => {
    setParentchild({
      parentid: parent,
      childid: child,
    });
    setOpenconfirm(!openconfirm);
  };
  const paginatePostAsset = paginate(listasset, currentPageAsset, pageSize); //กำหนดการแสดงข้อมูลในตาราง Asset

  return (
    <div className="grid">
      <div className="grid justify-items-end">
        <button
          type="button"
          onClick={() => openpopupasset()}
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900"
        >
          Add a new component
        </button>
      </div>
      <div className="grid relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-500  dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
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
                Serial No
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {listcomponent.map((res: any, ind: number) => (
              <tr key={ind}>
                <td className="px-6 py-4">{ind + 1}</td>
                <td className="px-6 py-4">{res.ItemName}</td>
                <td className="px-6 py-4">{res.Description}</td>
                <td className="px-6 py-4">{res.AssetIT}</td>
                <td className="px-6 py-4">{res.AssetACC}</td>
                <td className="px-6 py-4">{res.Serial}</td>
                <td
                  className="px-6 py-4 cursor-pointer"
                  onClick={() =>
                    openpopupconfirm(assetid, parseInt(res.ItemID))
                  }
                >
                  <MdDelete />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                  {paginatePostAsset.map((res: any, ind: number) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-300 dark:hover:bg-gray-600"
                      key={ind}
                    >
                      <th className="px-6 py-4">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          checked={
                            selectedCheckboxesPerPage[currentPageAsset]?.some(
                              (item) => item.itemId === res.ItemID
                            ) || false //ถ้าค่า ItemName มีใน array[page] = true | false*/
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
      {openconfirm ? (
        <>
          <PopupConfirm
            title={"ต้องการลบข้อมูลใช่หรือไม่"}
            toggle={openconfirm}
            handleTrue={"Confirm"}
            trueBtn={"Confirm"}
            handleFalse={"Cancel"}
            falseBtn={"Cancel"}
            onResult={handlePopupResult}
          />
        </>
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
    </div>
  );
}

export default AssetComponent;
