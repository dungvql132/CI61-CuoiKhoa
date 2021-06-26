import Processing from "../dataProcessing/Processing.js";
const $template = document.createElement("template");

$template.innerHTML = `
    <div class="js-page"></div>
`

export default class Page extends HTMLElement {
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
        let result = []
        let textBoxs = document.querySelectorAll(".js-div")
        textBoxs.forEach((element) => {
            result.push(element.parentNode.data);
        })
        // console.log(result);
        return JSON.stringify(result);
    }

    renderData() {
        this.myData = JSON.parse(this.data);
        this.myData.forEach(element => {
            this.$page.appendChild(Processing.createTextBox(element));
        });
    }

    createNewTextBox() {
        this.$page.appendChild(document.createElement("text-box"))
    }

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$page = this.querySelector(".js-page");
        // this.renderData();

        Processing.addEventPage(this.$page);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if( attrName == "data"){
            this.renderData();
        }
    }
}

window.customElements.define("story-page", Page);