import { useState, useEffect } from "react";
import PopupConfirm from "./PopupConfirm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateassigned } from "@/app/api/assign/assign";
import { async } from "rxjs";

async function UpdateAssetItem(name: string, id: number) {
  const res = await updateassigned({ itemid: id });
  if (res.status == 200) {
    return true;
  }
  return false;
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

export function BadgeGreen({
  name,
  itemid,
  title,
  trueBtn,
  falseBtn,
  onResult,
}: {
  name: string;
  itemid: number;
  title: string;
  trueBtn: string;
  falseBtn: string;
  onResult: (result:boolean)=>void;
}) {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleFalse = () => {
    setToggle(!toggle);
  };

  const handleChangeStatus = async() => {
    const result = await UpdateAssetItem(name, itemid);
    if (result) {
      handleSuccessButtonClick(`Remove : ${name} successfully.`);
      onResult(true);
    } else {
      onResult(false);
    }
  };

  return (
    <>
      <span
        id={`badge-dismiss-green`}
        className={`inline-flex items-center px-2 py-1 mr-2 text-sm font-medium rounded text-green-800 bg-green-100  dark:bg-green-900 dark:text-green-300`}
      >
        {name}
        <button
          type="button"
          className={`inline-flex items-center p-1 ml-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300`}
          data-dismiss-target={`#badge-dismiss-green`}
          aria-label="Remove"
        >
          <svg
            className="w-2 h-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            onClick={() => handleClick()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              strokeWidth={2}
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Remove badge</span>
        </button>
      </span>
      {toggle ? (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 flex-col">
            <div className="w-1/5 h-auto  p-2 mt-10 relative flex flex-col">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                  onClick={() => handleFalse()}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {title}
                    {name}
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => handleChangeStatus()}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    {trueBtn}
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => handleFalse()}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    {falseBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
export function BadgeBlue({
  name,
  itemid,
  title,
  trueBtn,
  falseBtn,
  onResult,
}: {
  name: string;
  itemid: number;
  title: string;
  trueBtn: string;
  falseBtn: string;
  onResult: (result:boolean)=>void;
}){
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleFalse = () => {
    setToggle(!toggle);
  };

  const handleChangeStatus = async () => {
    const result = await UpdateAssetItem(name, itemid);
    if (result) {
      handleSuccessButtonClick(`Remove : ${name} successfully.`);
      onResult(true);
    } else {
      onResult(false);
    }
  };

  return (
    <>
      <span
        id={`badge-dismiss-blue`}
        className={`inline-flex items-center px-2 py-1 mr-2 text-sm font-medium rounded text-blue-800 bg-blue-100  dark:bg-blue-900 dark:text-blue-300`}
      >
        {name}
        <button
          type="button"
          className={`inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300`}
          data-dismiss-target={`#badge-dismiss-blue`}
          aria-label="Remove"
        >
          <svg
            className="w-2 h-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            onClick={() => handleClick()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              strokeWidth={2}
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Remove badge</span>
        </button>
      </span>
      {toggle ? (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 flex-col">
            <div className="w-1/5 h-auto  p-2 mt-10 relative flex flex-col">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                  onClick={() => handleFalse()}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {title}
                    {name}
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => handleChangeStatus()}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    {trueBtn}
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => handleFalse()}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    {falseBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
/*
<PopupConfirm
          toggle={toggle}
          title={"Title text alert delete"}
          trueBtn={"Confirm"}
          falseBtn={"Cancel"}
          handleTrue={"Delete"}
          handleFalse={"Cancel"}
          />


<PopupConfirm
          toggle={toggle}
          handleTrue={handleTrue}
          handleFalse={handleFalse}
          trueBtn={trueButtonName}
          falseBtn={falseButtonName}
          title={title}
        />*/
