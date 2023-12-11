import React from 'react'

export function asset(credentials:any) {
  return fetch("http://10.15.0.23:4000/v1/addasset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
export function updateasset(credentials:any) {
  return fetch("http://10.15.0.23:4000/v1/updateasset", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
export function deletecomponent(credentials:any) {
  return fetch("http://10.15.0.23:4000/v1/deletecomponent", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
export function assetmaster() {
  return fetch("http://10.15.0.23:4000/v1/listasset", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }).then((data) => data.json());
}
export function assetmasterassign() {
  return fetch("http://10.15.0.23:4000/v1/listassetassign", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }).then((data) => data.json());
}
export function assetuserhw(username:number) {
  const url = `http://10.15.0.23:4000/v1/getassetuserhw/${username}`;
  return fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((data) => data.json());
}
export function assetusersw(username:number) {
  const url = `http://10.15.0.23:4000/v1/getassetusersw/${username}`;
  return fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((data) => data.json());
}
export function assetcomponent() {
  return fetch("http://10.15.0.23:4000/v1/listcomponent", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }).then((data) => data.json());
}
export function assettimeline(assetid:number) {
  const url = `http://10.15.0.23:4000/v1/gettimeline/${assetid}`;
  return fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((data) => data.json());
}
export function updateAssetAcc(credentials:any) {
  return fetch("http://10.15.0.23:4000/v1/updateassetacc", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}