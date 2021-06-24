import InputDropdown from "./component/InputDropdown.js";
import InputWrapper from "./component/InputWrapper.js";
import Processing from "./dataProcessing/Processing.js";
import FormData from "./data/FormData.js";

let a = document.getElementById("design-area");

let b = document.createElement("input-dropdown");
a.appendChild(b);

let c = [1,5,8,3];
b.data = JSON.stringify(c);
console.log("thay doi");
b.value = '8'

console.log(FormData.fonts);
let d = document.querySelector(".js-fontfamily");
d.data = JSON.stringify(FormData.fonts);
d = document.querySelector(".js-borderstyle");
d.data = JSON.stringify(FormData.borderStyle)