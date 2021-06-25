const $template = document.createElement("template");

$template.innerHTML = `

`

export default class MyDiv extends HTMLElement{
    constructor(){
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

    get dataHTML(){
        
    }

    connectedCallback(){
        this.appendChild($template.content.cloneNode(true));
    }

    attributeChangedCallback(attrName, oldValue, newValue) {

    }
}

window.customElements.define("my-div",MyDiv);