
import Processing from "../dataProcessing/Processing.js";
const $template = document.createElement("template");

$template.innerHTML = `
<div class="form-data disappear">
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">description</div>
    </div>
    <div class="data-process disappear">
       <textarea class="js-description" >mot cai j do</textarea>
    </div>
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">date</div>
    </div>
    <div class="data-process disappear">
       <div class="js-dateModified"> mot ngay nao do</div>
    </div>
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">title</div>
    </div>
    <div class="data-process disappear">
       <textarea class="js-title" >mot cai j do</textarea>
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

        if(myData.dateModified == "undefined" || myData.dateModified == null){
            myData.dateModified = Processing.getToDay();
        }
        return myData;
    }

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$description = this.querySelector(".js-description");
        this.$dateModified = this.querySelector(".js-dateModified");
        this.$title = this.querySelector(".js-title");
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "data") {
            let myData = JSON.parse(newValue);
            this.$dateModified.innerHTML = myData.dateModified;
            this.$description.value = myData.description;
            this.$title.value = myData.title;
        }
    }
}

window.customElements.define("design-story-form", DesignStoryForm);