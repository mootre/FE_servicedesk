export const getProducttype =  fetch("http://10.15.1.20:4000/prodtype", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
}).then((data) => data.json())
export const getOwner =  fetch("http://10.15.1.20:4000/owner", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
})
.then((data) => data.json())
//.then((data) => data.filter((item)=>item.Owner));