import TextBox from "../class/TextBox.js";

TextBox
const $template = document.createElement("template");

$template.innerHTML = `
    <div class = "my-page">

    </div>
`

export default class MyPage extends HTMLElement{
    constructor(){
        super();
        // this.appendChild($template.content.cloneNode(true));

    }

    static get observedAttributes() {
        return ["data"]
    }

    get data(){
        return this.getAttribute("data");
    }

    set data(string){
        this.setAttribute("data",string);
    }

    renderData(){
        let myData = JSON.parse(this.data);
        console.log(myData);
        let dom = new TextBox();
        myData.forEach(element => {
            dom.update(element.style)
            this.$myPage.appendChild(dom.toDom)
            console.log("element: "+element.style);
        });
    }

    connectedCallback(){
        this.appendChild($template.content.cloneNode(true));
        this.$myPage = this.querySelector(".my-page");
        this.renderData();
    }

    attributeChangedCallback(attrName, oldValue, newValue) {

    }
}

window.customElements.define("my-page",MyPage);