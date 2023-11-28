
export function alluser() {
  return fetch("http://10.15.0.23:4000/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

export function assignasset(credentials:any) {
  return fetch("http://10.15.0.23:4000/v1/addasset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export function userlogin(credentials:any) {
  return fetch("http://10.15.0.23:4000/user/login", {
  //return fetch("http://localhost:4000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export function userdetail(credentials:any) {
  //return fetch("http://10.15.0.23:4000/user/login", {
  return fetch(`http://10.15.0.23:4000/user/${credentials}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

export async function Cookielogin(credentials: any) {
  try {
    const data = await userlogin(credentials);

    return new Response(null, {
      status: 200,
      headers: { "Set-Cookie": data.access_token },
    });
  } catch (error) {
    // Handle errors appropriately
    console.error("Error during Cookielogin:", error);
    throw error; // Rethrow the error or handle it based on your requirements
  }
}