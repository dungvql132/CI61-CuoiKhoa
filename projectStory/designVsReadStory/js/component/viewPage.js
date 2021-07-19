import ViewTextBox from "./viewTextBox.js";
const $template = document.createElement("template");

$template.innerHTML = `
    <div class="js-page"></div>
`

export default class ViewPage extends HTMLElement {
    constructor() {
        super();
        // this.appendChild($template.content.cloneNode(true));

    }

    static get observedAttributes() {
        return ["data", "appear"]
    }

    get data() {
        return this.getAttribute("data")
    }

    set data(string) {
        this.setAttribute("data", string)
    }

    set appear(string) {
        this.setAttribute("appear", string)
    }

    renderData() {
        let myData = JSON.parse(this.data);
        this.$page.innerHTML = '';
        let newViewTextBox;
        myData.textboxs.forEach(element => {
            newViewTextBox = new ViewTextBox();
            newViewTextBox.data = element;
            this.$page.appendChild(newViewTextBox);
        });
        this.$page.style.cssText = myData.cssText;
    }

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$page = this.querySelector(".js-page");
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if( attrName == "data"){
            this.renderData();
        }
    }
}

window.customElements.define("view-story-page", ViewPage);