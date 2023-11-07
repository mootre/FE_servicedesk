/*import {FC} from "react"
interface pageProps{
    params:{id:string}
}
const page:FC<pageProps>=({params})=>{
    return <div>page : {params.id}</div>
}*/
"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { DDProducttype, DDOwner } from "@/components/ui/Dropdownlist";
import { asset, updateasset } from "@/app/api/asset/asset";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {assetbyitem} from "@/app/api/asset/[...aseetid]/asset";
import Back from "@/components/ui/Back";
import { Urlconverto, converttoUrl } from "@/components/function/function";

//export default page;
export default function page({ params }: { params: { id: string } }) {
  const [name, setName] = useState(
    decodeURIComponent(params.id.replace(/\+/g, " ")).replace(/\+/g, " ")
  );
  const [assetit, setAssetid] = useState("");
  const [assetacc, setAssetacc] = useState("");
  const [inv, setInv] = useState("");
  const [invdate, setInvdate] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
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

  const handleSuccessButtonClick = () => {
    toast.success("Asset updated successfully.", {
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
    toast.error("Unable to update asset item.", {
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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await updateasset({
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
    });
    if (response.status == 200) {
      handleSuccessButtonClick();
    } else {
      handleErrorButtonClick();
      return;
    }
  };

  useEffect(() => {
    async function getdetailasset() {
      try {
        const res = await assetbyitem({
          params: { id: 1},//Urlconverto(params.id) },
        });
        const result = res.result.data[0];
        setInv(result.Invno);
        setInvdate(new Date(result.Invdate).toISOString().split("T")[0]);
        setType(result.AssetType);
        setAssetid(result.AssetIT);
        setStatus(result.AssetStatus);
        setManufactor(result.Manufactor);
        setSupplier(result.Supplier);
        setSerial(result.Serial);
        setSerialno(result.SerialNo);
        setModel(result.Model);
        setEdition(result.Edition);
        setVersion(result.Version);
        setInstal(result.Installation);
        setAssetacc(result.AssetACC);
        setQty(result.Qty);
        setSdate(new Date(result.Entrydate).toISOString().split("T")[0]);
        setEdate(new Date(result.Expirydate).toISOString().split("T")[0]);
        setDescription(result.Description);
      } catch (error) {
        console.log(error);
      }
    }
    getdetailasset();
  }, []);
  return (
    <div>
      <Back />
      <label className="font-bold">Asset Details</label>
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
                disabled
                className="bg-amber-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={name}
                //onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="max-md:hidden"></div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 ">
                Invoice No.
              </label>
              <input
                type="text"
                disabled
                className="bg-amber-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={inv}
                onChange={(e) => setInv(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 ">
                Invoice Date
              </label>
              <input
                type="date"
                disabled
                className="bg-amber-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={invdate}
                onChange={(e) => setInvdate(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 ">
                Category
              </label>
              <input
                type="text"
                disabled
                className="bg-amber-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={type}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 ">
                Asset Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
                value={manufactor}
                onChange={(e) => setManufactor(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 ">
                Supplier
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              ></input>
            </div>
            <div>
              {type !== "Software" ? (
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
                        value={serial}
                        onChange={(e) => setSerial(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label className="block mb-2 mt-2 text-sm font-medium text-gray-700 ">
                        Model
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                      ></input>
                    </div>
                  </section>
                  <input
                    type="hidden"
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={assetit}
                    onChange={(e) => setAssetid(e.target.value)}
                  ></input>
                </>
              ) : null}
            </div>
            <div>
              {type === "Software" ? (
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
                        value={serialno}
                        onChange={(e) => setSerialno(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label className="block mb-2 mt-2 text-sm font-medium text-gray-700 ">
                        Edition
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={edition}
                        onChange={(e) => setEdition(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label className="block mb-2 mt-2 text-sm font-medium text-gray-700 ">
                        Version
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label className="block mb-2 mt-2 text-sm font-medium text-gray-700 ">
                        Installation
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={instal}
                        onChange={(e) => setInstal(e.target.value)}
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
                value={assetacc}
                onChange={(e) => setAssetacc(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 ">
                Q'ty
              </label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min={1}
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
                value={sdate}
                disabled
                onChange={(e) => setSdate(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 ">
                Expiry Date
              </label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={edate}
                onChange={(e) => setEdate(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update Asset
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
  );
}
