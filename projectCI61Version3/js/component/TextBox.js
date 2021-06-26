import FormData from "../data/FormData.js";
import Processing from "../dataProcessing/Processing.js"

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
        return ["data", "position", "work"]
    }

    get cssText() {
        return this.querySelector(".js-div").style.cssText;
    }

    get data() {
        return this.getAttribute("data")
    }

    set data(string) {
        this.setAttribute("data", string)
    }

    get position() {
        return this.getAttribute("position")
    }

    set position(string) {
        this.setAttribute("position", string)
    }

    set addClass(string) {
        this.$div.classList.add(string);
    }

    set removeClass(string) {
        this.$div.classList.remove(string)
    }

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$div = this.querySelector(".js-div");
        let myData;
        if (this.data != null) {
            // console.log("tu dong vao");
            myData = JSON.parse(this.data);
            this.$div.innerHTML = myData.innerHTML;
            this.$div.style.cssText = myData.cssText;
            if (this.position != Processing.getPositionFromCssText(myData.cssText)) {
                this.position = Processing.getPositionFromCssText(myData.cssText);
            }
        } else {
            this.data = FormData.defaultTextBox;
        }

        // this.addEventListener("click", ()=>{
        //     whenClickTextBox(this)
        // })

        Processing.addEventTextBox(this);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "data") {
            let myData = JSON.parse(newValue);
            this.$div.innerHTML = myData.innerHTML;
            this.$div.style.cssText = myData.cssText;

            if (this.position != Processing.getPositionFromCssText(myData.cssText)) {
                this.position = Processing.getPositionFromCssText(myData.cssText);
            }
        } else if (attrName == "position") {
            let myData = JSON.parse(this.data);
            this.$div.style.cssText += Processing.getPositionCss(newValue);
            myData.cssText = this.$div.style.cssText;
            this.data = JSON.stringify(myData);
        }
    }
}

window.customElements.define("text-box", TextBox);