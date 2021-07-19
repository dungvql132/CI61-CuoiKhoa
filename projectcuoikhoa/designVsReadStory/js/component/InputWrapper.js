import Processing from "../dataProcessing/Processing.js";

const $template = document.createElement("template");

$template.innerHTML = `
    <div class="js-label"></div>
    <input class="js-input" type="" value="">
`

export default class InputWrapper extends HTMLElement {
    constructor() {
        super();
        // this.appendChild($template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["type", "value", "kindcss", "givedata", "keepdata", "returndata", "text"]
    }

    // getter and setter ----------------------------------------
    get givedata() {
        return this.getAttribute("givedata");
    }

    get keepdata() {
        return this.getAttribute("keepdata");
    }

    get returndata() {
        return this.getAttribute("returndata");
    }

    get kindcss() {
        return this.getAttribute("kindcss");
    }

    get value() {
        return this.getAttribute("value");
    }

    set value(string) {
        this.setAttribute("value", string);
    }


    get dataHTML() {
        let data = Processing.processInputWrapperOut(this.$input.value, this.givedata, this.keepdata);
        if (this.kindcss != null) {
            return this.kindcss + ":" + data + ";"
        } else {
            return data;
        }
    }
    // -----------------------------------------------------

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$input = this.querySelector(".js-input");
        this.$label = this.querySelector(".js-label");
        this.$input.addEventListener("change", saveTextBoxData)

        this.$label.innerHTML = this.getAttribute("text");
        this.$input.type = this.getAttribute("type");

        this.$input.value = Processing.processInputWrapperIn(this.value, this.givedata, this.keepdata);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "value") {
            this.$input.value = Processing.processInputWrapperIn(this.value, this.givedata, this.keepdata);
            // cài đặt value cho input
        }
    }
}

window.customElements.define("input-wrapper", InputWrapper);