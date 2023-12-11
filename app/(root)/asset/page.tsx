"use client";

import React, { useState, useEffect } from "react";
import { DDProducttype, DDOwner } from "@/components/ui/Dropdownlist";
import { asset } from "@/app/api/asset/asset";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Back from "@/components/ui/Back";
import { useSessionLogin } from "@/components/function/function";
import { useSession } from "next-auth/react";

function page() {
  const [name, setName] = useState("");
  const [assetit, setAssetid] = useState("");
  const [assetacc, setAssetacc] = useState("");
  const [inv, setInv] = useState("");
  const [invdate, setInvdate] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Active");
  const [serial, setSerial] = useState("");
  const [serialno, setSerialno] = useState("");
  const [model, setModel] = useState("");
  const [manufactor, setManufactor] = useState("");
  const [supplier, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [edition, setEdition] = useState("");
  const [version, setVersion] = useState("");
  const [instal, setInstal] = useState("");
  const [qty, setQty] = useState(1);
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [description, setDescription] = useState("");
  const [boxsoftware, setBoxsoftware] = useState("");
  const { data: session } = useSession();

  useSessionLogin();

  useEffect(() => {
    if (type === "Software") {
      setBoxsoftware("Software");
    } else if (type === "") {
      setBoxsoftware("");
    } else {
      setBoxsoftware("Hardware");
    }
  }, [type]);

  const handleSuccessButtonClick = () => {
    toast.success("Asset inserted successfully.", {
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
  const clearInput = () => {
    setName("");
    setAssetid("");
    setAssetacc("");
    setInv("");
    setInvdate("");
    setType("");
    setStatus("Active");
    setSerial("");
    setSerialno("");
    setModel("");
    setManufactor("");
    setSupplier("");
    setCategory("");
    setEdition("");
    setVersion("");
    setInstal("");
    setQty(1);
    setSdate("");
    setEdate("");
    setDescription("");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await asset({
      name: name,
      assetit: assetit,
      assetacc: assetacc,
      inv: inv,
      invdate: invdate,
      type: type,
      status: status,
      serial: serial,
      serialno: serialno,
      model: model,
      manufactor: manufactor,
      supplier: supplier,
      category: category,
      edition: edition,
      version: version,
      instal: instal,
      qty: qty,
      sdate: sdate,
      edate: edate,
      description: description,
      insertby: session?.user.name,
    });
    if (response.status == 200) {
      handleSuccessButtonClick();
      clearInput();
    } else {
      handleErrorButtonClick();
      return;
    }
  };
  return (
    <>
      {session ? (
        <div>
          <Back />
          <label className="font-bold">New Asset</label>
          <hr className="h-px my-1 bg-gray-400 border-0" />
          <div className="mt-12">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  ></input>
                </div>
                <div className="max-md:hidden"></div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 ">
                    Invoice No.
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setInv(e.target.value)}
                    value={inv}
                  ></input>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 ">
                    Invoice Date
                  </label>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setInvdate(e.target.value)}
                    value={invdate}
                  ></input>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 ">
                    Category
                  </label>
                  <DDProducttype value={type} onChange={setType} />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 ">
                    Asset Status
                  </label>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="Acitvie">Active</option>
                    <option value="Inprocess">Inprocess</option>
                    <option value="Hold">Hold</option>
                    <option value="Repair">Repair</option>
                    <option value="Reject">Reject</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 ">
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setManufactor(e.target.value)}
                    value={manufactor}
                  ></input>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 ">
                    Supplier
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setSupplier(e.target.value)}
                    value={supplier}
                  ></input>
                </div>
                <div>
                  {boxsoftware === "Hardware" || boxsoftware === "" ? (
                    <>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Hardware
                      </label>
                      <section className="border border-gray-200 rounded-lg p-2 bg-yellow-50">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700 ">
                            Serial
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setSerial(e.target.value)}
                            value={serial}
                          ></input>
                        </div>
                        <div>
                          <label className="block mb-2 mt-2 text-sm font-medium text-gray-700 ">
                            Model
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setModel(e.target.value)}
                            value={model}
                          ></input>
                        </div>
                      </section>
                    </>
                  ) : null}
                </div>
                <div>
                  {boxsoftware === "Software" || boxsoftware === "" ? (
                    <>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Software
                      </label>
                      <section className="border border-gray-200 rounded-lg p-2 bg-yellow-50">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700 ">
                            License No.
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setSerialno(e.target.value)}
                            value={serialno}
                          ></input>
                        </div>
                        <div>
                          <label className="block mb-2 mt-2 text-sm font-medium text-gray-700 ">
                            Edition
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setEdition(e.target.value)}
                            value={edition}
                          ></input>
                        </div>
                        <div>
                          <label className="block mb-2 mt-2 text-sm font-medium text-gray-700 ">
                            Version
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setVersion(e.target.value)}
                            value={version}
                          ></input>
                        </div>
                        <div>
                          <label className="block mb-2 mt-2 text-sm font-medium text-gray-700 ">
                            Installation
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setInstal(e.target.value)}
                            value={instal}
                          ></input>
                        </div>
                      </section>
                    </>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 ">
                    Asset Account
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setAssetacc(e.target.value)}
                    value={assetacc}
                  ></input>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 ">
                    Q'ty
                  </label>
                  <input
                    type="number"
                    min={1}
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setQty(parseInt(e.target.value))}
                    value={qty}
                  ></input>
                </div>
                <div>
                  <label className="block mb-2  text-sm font-medium text-gray-700 ">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setSdate(e.target.value)}
                    value={sdate}
                  ></input>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 ">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setEdate(e.target.value)}
                    value={edate}
                  ></input>
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700 ">
                  Description
                </label>
                <textarea
                  id="description"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
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
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default page;
