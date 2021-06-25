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
        return ["data", "move"]
    }

    get data() {
        return this.getAttribute("data")
    }

    set data(string) {
        this.setAttribute("data", string)
    }

    get move() {
        return this.getAttribute("move")
    }

    set move(string) {
        this.setAttribute("move", string)
    }

    set addClass(string){
        console.log("them class");
        this.$div.classList.add(string);
    }

    set removeClass(string){
        console.log("xoa class");
        this.$div.classList.remove(string)
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

        // this.addEventListener("click", ()=>{
        //     whenClickTextBox(this)
        // })

        this.addEventListener("mousedown", (event)=>{
            whenClickTextBox(this)
            mouseDown(this.move,event.screenY,event.screenX);
        })

        this.addEventListener("mousemove", (event) => {
            if(isCanMove()){
                changeDataForm(this)
                this.move = mouseMove(event.screenY,event.screenX);
            }
        })

        this.addEventListener("mouseup", () => {
            mouseRelease();
        })
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == "data") {
            let myData = JSON.parse(newValue);
            this.$div.innerHTML = myData.innerHTML;
            this.$div.style.cssText = myData.cssText;

            if(this.move != Processing.getPositionFromCssText(myData.cssText)){
                this.move = Processing.getPositionFromCssText(myData.cssText);    
            }
        }else if ( attrName == "move"){
            let myData = JSON.parse(this.data);
            this.$div.style.cssText += Processing.getPositionCss(newValue);
            myData.cssText = this.$div.style.cssText;
            this.data = JSON.stringify(myData);
        }
    }
}

window.customElements.define("text-box", TextBox);