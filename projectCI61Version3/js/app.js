import InputDropdown from "./component/InputDropdown.js";
import InputWrapper from "./component/InputWrapper.js";
import Processing from "./dataProcessing/Processing.js";
import FormData from "./data/FormData.js";
import TextBox from "./component/TextBox.js";
import DesignForm from "./component/DesignForm.js";
import Page from "./component/Page.js";

console.log("phien ban chay tet ga");

let a = document.querySelector(".js-story-page")
a.data = localStorage.getItem("my-page")
// console.log(a.data);
console.log(JSON.parse(JSON.parse(a.data)[0]));