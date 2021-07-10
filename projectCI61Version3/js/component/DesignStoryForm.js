import FormData from "../data/FormData.js";
import Processing from "../dataProcessing/Processing.js";
const $template = document.createElement("template");

$template.innerHTML = `
<div class="form-data disappear">
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">Miêu Tả</div>
    </div>
    <div class="data-process number-3 disappear">
       <textarea class="js-textarea js-description" >mot cai j do</textarea>
    </div>
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">Ngày viết</div>
    </div>
    <div class="data-process number-1 disappear">
       <div class="js-dateModified"> mot ngay nao do</div>
    </div>
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">Thể Loại Chính</div>
    </div>
    <div class="data-process number-1 disappear">
        <input-dropdown class="js-ip-style js-kinds" text="Thể Loại"></input-dropdown>
    </div>
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">Tiêu Đề</div>
    </div>
    <div class="data-process number-1 disappear">
       <textarea class="js-textarea js-title" >mot cai j do</textarea>
    </div>
</div>
`

export default class DesignStoryForm extends HTMLElement {
    constructor() {
        super();
        // this.appendChild($template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["data"]
    }

    get data() {
        return this.getAttribute("data")
    }

    set data(string) {
        this.setAttribute("data", string)
    }

    get dataHTML() {
        let myData = JSON.parse(this.data);
        myData.dateModified = this.$dateModified.innerHTML;
        myData.description = this.$description.value;
        myData.title = this.$title.value;
        myData.data = document.querySelector("story-maked").dataHTML;
        myData.kinds = this.kinds.dataHTML;
        myData.page = document.querySelector("story-maked").urlFirstPage;

        if(myData.dateModified == "undefined" || myData.dateModified == null){
            myData.dateModified = Processing.getToDay();
        }
        console.log(myData);
        return myData;
    }

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$description = this.querySelector(".js-description");
        this.$dateModified = this.querySelector(".js-dateModified");
        this.$title = this.querySelector(".js-title");
        this.kinds = this.querySelector(".js-kinds");
        this.kinds.data = FormData.kinds;
        // console.log(FormData.kinds);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "data") {
            let myData = JSON.parse(newValue);
            this.$dateModified.innerHTML = myData.dateModified;
            this.$description.value = myData.description;
            this.$title.value = myData.title;
            this.kinds.value = myData.kinds;
        }
    }
}

window.customElements.define("design-story-form", DesignStoryForm);