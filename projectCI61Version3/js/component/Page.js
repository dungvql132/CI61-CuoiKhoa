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
        return ["data", "appear"]
    }

    get data() {
        return this.getAttribute("data")
    }

    set data(string) {
        this.setAttribute("data", string)
    }

    get appear() {
        return this.getAttribute("appear")
    }

    set appear(string) {
        this.setAttribute("appear", string)
    }

    get dataHTML() {
        let result = {
            textboxs : [],
            cssText : ''
        }
        let textBoxs = this.querySelectorAll(".js-div")
        textBoxs.forEach((element) => {
            result.textboxs.push(element.parentNode.data);
        })
        result.cssText = this.$page.style.cssText;
        // console.log(result);
        return JSON.stringify(result);
    }

    get cssText(){
        return this.$page.style.cssText;
    }

    set cssText(string){
        this.$page.style.cssText = string;
    }

    renderData() {
        // console.log("render Page ======================");
        let myData = JSON.parse(this.data);
        // console.log(this.myData);
        myData.textboxs.forEach(element => {
            Processing.createTextBox(this.$page,element)
            // console.log(this.$page);
        });
        this.$page.style.cssText = myData.cssText;
    }

    createNewTextBox() {
        this.$page.appendChild(document.createElement("text-box"))
    }

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$page = this.querySelector(".js-page");
        if(this.appear == "ok"){
            this.$page.classList.remove("disappear")
        }else{
            this.$page.classList.add("disappear")
        }
        // this.renderData();
        // console.log(this.$page);

        Processing.addEventPage(this.$page);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if( attrName == "data"){
            this.renderData();
        }else if ( attrName == "appear"){
            if(newValue == "ok"){
                this.$page.classList.remove("disappear")
                this.$page.classList.add("page-appear")
                selectThisPage(this)
            }else{
                this.$page.classList.add("disappear")
                this.$page.classList.remove("page-appear")
            }
            // console.log("data trang nay: " + this.dataHTML);
        }
    }
}

window.customElements.define("story-page", Page);