export const converttoUrl=(_param)=>{
    const decodedId = decodeURIComponent(_param).replace(/ /g, "+");
    return decodedId;
}

export const Urlconverto=(_param)=>{
    const decodedId = decodeURIComponent(_param).replace(/\+/g, ' ');
    return decodedId;
}