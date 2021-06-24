import FormData from "../data/FormData.js";

const $template = document.createElement("template");

$template.innerHTML = `
    <div class="js-div"></div>
`

export default class TextBox extends HTMLElement {
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

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$div = this.querySelector(".js-div");
        let myData;
        if (this.data != null) {
            myData = JSON.parse(this.data);
            this.$div.innerHTML = myData.innerHTML;
            this.$div.style.cssText = myData.cssText;
        }else{
            this.data = FormData.defaultTextBox;
        }

        this.addEventListener("click", ()=>{
            return whenClickTextBox(this)
        })
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "data") {
            let myData = JSON.parse(newValue);
            this.$div.innerHTML = myData.innerHTML;
            this.$div.style.cssText = myData.cssText;
            try {

            } catch (error) {

            }
        }
    }
}

window.customElements.define("text-box", TextBox);