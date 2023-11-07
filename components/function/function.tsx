export const converttoUrl=(_param:string)=>{
    const decodedId = decodeURIComponent(_param).replace(/ /g, "+");
    return decodedId;
}

export const Urlconverto=(_param:string)=>{
    const decodedId = decodeURIComponent(_param).replace(/\+/g, ' ');
    return decodedId;
}