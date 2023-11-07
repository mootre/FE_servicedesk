export function assignasset(credentials:any) {
  return fetch("http://10.15.0.23:4000/v1/addassignasset", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export function updateassigned(credentials:any) {
  return fetch("http://10.15.0.23:4000/v1/updateassign", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export function assigncomponent(credentials:any) {
  return fetch("http://10.15.0.23:4000/v1/addassigncomponent", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}