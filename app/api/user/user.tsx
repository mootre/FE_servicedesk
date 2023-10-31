import React from "react";

export function alluser() {
  return fetch("http://10.15.0.23:3001/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

export function assignasset(credentials) {
  return fetch("http://10.15.0.23:3001/v1/addasset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
