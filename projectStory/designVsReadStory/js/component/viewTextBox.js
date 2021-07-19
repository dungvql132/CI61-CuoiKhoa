const $template = document.createElement("template");

$template.innerHTML = `
    <div class="js-div"></div>
`

export default class ViewTextBox extends HTMLElement {
    constructor() {
        super();
        // this.appendChild($template.content.cloneNode(true));
        this.appendChild($template.content.cloneNode(true));
        this.$div = this.querySelector(".js-div");
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

    render(){
        if (this.data != null) {
            let myData = JSON.parse(this.data);
            this.$div.innerHTML = myData.innerHTML;
            this.$div.style.cssText = myData.cssText;
            this.$div.classList.add("animate__animated")
            this.$div.classList.add("animate__"+myData.animation)          
        } else {
            this.data = FormData.defaultTextBox;
        }
    }

    connectedCallback() {
        
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "data") {
            this.render();
        }
    }
}

window.customElements.define("view-text-box", ViewTextBox);