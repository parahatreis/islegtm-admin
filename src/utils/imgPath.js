// convert buffer to image
function imgPath(str) {
    let imageStr = str;
    imageStr = imageStr.replace("./public", "");
    let newUrl = "http://localhost:5000" + imageStr;
    return newUrl
 }
 
 export default imgPath;