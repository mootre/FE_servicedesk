export const getProducttype =  fetch("http://10.15.0.23:3001/prodtype", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
}).then((data) => data.json())
export const getOwner =  fetch("http://10.15.0.23:3001/owner", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
})
.then((data) => data.json())
//.then((data) => data.filter((item)=>item.Owner));