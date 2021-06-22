import String from "../treat/String.js";
const $template = document.createElement("template");

$template.innerHTML = `
    <div class="js-label"></div>
    <input class="js-input" type="" value="" placeholder="">
`

export default class InputWrapper extends HTMLElement {
    constructor() {
        super();
        // this.appendChild($template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["placeholder", "type", "value", "csselement"]
    }

    // getter and setter ----------------------------------------
    get placeholder() {
        return this.getAttribute("placeholder");
    }

    set placeholder(string) {
        this.setAttribute("placeholder", string);
    }

    get type() {
        return this.getAttribute("type");
    }

    set type(string) {
        this.setAttribute("type", string);
    }

    get value() {
        return this.getAttribute("value");
    }

    set value(string) {
        this.setAttribute("value", string);
    }

    get csselement() {
        return this.getAttribute("csselement");
    }

    set csselement(string) {
        this.setAttribute("csselement", string);
    }

    get DataHTML() {
        if (this.$input.type == "number") {
            return this.csselement + ":" + this.$input.value + "px" + ";";
        } else if(this.$label.innerHTML == "background-image"){
            return this.csselement + ": url(" + this.$input.value + ");";
        }else{
            return this.csselement + ":" + this.$input.value + ";";
        }
    }
    // -----------------------------------------------------
    start() {
        this.$label.innerHTML = this.csselement;
        this.$input.type = this.type;
        this.$input.value = String.fromPXtoNumber(this.value);
        this.$input.placeholder = String.fromPXtoNumber(this.placeholder);
    }

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.classList.add("js-input-wrapper");

        this.$input = this.querySelector(".js-input");
        this.$label = this.querySelector(".js-label");
        this.start();
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "placeholder") {
            try {
                this.$input.placeholder = String.fromPXtoNumber(newValue);
            } catch (error) {

            }
        } else if (attrName == "value") {
            try {
                if(this.type == 'number'){
                    this.$input.value = String.fromPXtoNumber(newValue);
                }else if(this.type == 'color'){
                    this.$input.value = String.fromRGBtoHEX(newValue);
                }else if (this.csselement == "background-image"){
                    console.log("nen: "+newValue);
                    console.log("link: "+ String.fromURLtoString(newValue));
                    this.$input.value = String.fromURLtoString(newValue);
                }else{
                    this.$input.value = newValue;
                }
            } catch (error) {

            }
        } else if (attrName == "type") {
            try {
                this.$input.type = newValue;
            } catch (error) {

            }
        } else if (attrName == "csselement") {
            try {
                this.$label.innerHTML = newValue;
            } catch (error) {

            }
        }
    }
}

window.customElements.define("input-wrapper", InputWrapper);