export function assetbyitem({ params }: { params: { id: number } }) {
  const url = `http://10.15.0.23:4000/v1/getasset/${params.id}`;
  return fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((data) => data.json());
}

export function componetbyitem({ params }: { params: { id: number } }) {
  const url = `http://10.15.0.23:4000/v1/getcomponent/${params.id}`;
  return fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((data) => data.json());
}