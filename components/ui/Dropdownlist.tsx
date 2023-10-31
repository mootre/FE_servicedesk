"use client";

import { getProducttype,getOwner } from "@/app/api/catagory/catagory";
import React,{useState,useEffect} from "react";

export const DDProducttype = ({onChange}) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    async function fetchData() {
      const typesData = await getProducttype;
      setTypes(typesData);
    }
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
    onChange(event.target.value);
  };
  return (
    <select
    id="prodtype"
    value={selectedType} onChange={handleSelectChange}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option></option>
    {types.map((type) => (
      <option key={type.product_type} value={type.product_type}>{type.product_type}</option>
    ))}
  </select>
  );
};

export const DDOwner = () => {
  const [typesOwner, setTypesOwner] = useState([]);
  const [selectedTypeOwner, setSelectedTypeOwner] = useState("");

  useEffect(() => {
    async function fetchDataOwner() {
      const typesData = await getOwner;
      if (typesData) {
        setTypesOwner(typesData);
      }
    }
    fetchDataOwner();
  }, []);

  const handleSelectChangeOwner = (event) => {
    setSelectedTypeOwner(event.target.value);
  };
  return (
    <select
    id="owner"
    value={selectedTypeOwner} onChange={handleSelectChangeOwner}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option></option>
    {typesOwner.map((type) => (
      <option key={type.Owner} value={type.Owner}>
        {type.Owner}
      </option>
    ))}
  </select>
  );
};