import InputDropdown from "./component/InputDropdown.js";
import InputWrapper from "./component/InputWrapper.js";
import Processing from "./dataProcessing/Processing.js";
import FormData from "./data/FormData.js";
import TextBox from "./component/TextBox.js";
import DesignForm from "./component/DesignForm.js";
import Page from "./component/Page.js";
import Story from "./component/Story.js";

console.log("phien ban chay tet ga");

let area = document.getElementById("design-area");
let a = document.createElement("story-maked");
a.classList.add("js-story-hi");
area.appendChild(a);

if(localStorage.getItem("myStory") != null){
    a.data = localStorage.getItem("myStory");
}else{
    a.data = "1"
}