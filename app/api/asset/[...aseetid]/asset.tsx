import React from "react";

export function assetbyitem({ params }: { params: { id: number } }) {
  const url = `http://10.15.1.20:4000/v1/getasset/${params.id}`;
  return fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((data) => data.json());
}

export function componetbyitem({ params }: { params: { id: number } }) {
  const url = `http://10.15.1.20:4000/v1/getcomponent/${params.id}`;
  return fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((data) => data.json());
}