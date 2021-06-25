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
        return ["data", "position"]
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

    set addClass(string){
        this.$div.classList.add(string);
    }

    set removeClass(string){
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
            mouseDown(this.position,event.screenY,event.screenX);
            Processing.preventMoveOut(this.position,this.$div.style.cssText,this.parentNode.clientHeight,this.parentNode.clientWidth)

        })

        this.addEventListener("mousemove", (event) => {
            let checkLimit = Processing.preventMoveOut(mouseMove(event.screenY,event.screenX),this.$div.style.cssText,this.parentNode.clientHeight,this.parentNode.clientWidth);
            if(isCanMove() && checkLimit){
                changeDataForm(this)
                this.position = mouseMove(event.screenY,event.screenX);
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

            if(this.position != Processing.getPositionFromCssText(myData.cssText)){
                this.position = Processing.getPositionFromCssText(myData.cssText);    
            }
        }else if ( attrName == "position"){
            let myData = JSON.parse(this.data);
            this.$div.style.cssText += Processing.getPositionCss(newValue);
            myData.cssText = this.$div.style.cssText;
            this.data = JSON.stringify(myData);
        }
    }
}

window.customElements.define("text-box", TextBox);