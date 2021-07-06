import Processing from "../dataProcessing/Processing.js";
const $template = document.createElement("template");

$template.innerHTML = `
<div class="form-data disappear">
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">nền trang</div>
    </div>
    <div class="data-process disappear">
        <input-wrapper class="js-ip-style" type="text" text="ảnh nền" givedata="url" keepdata="string" kindcss="background-image"></input-wrapper>
    </div>
</div>
`

export default class DesignPageForm extends HTMLElement{
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
        let result = {
            cssText : '',
            innerHTML : '',
            animation : ''
        }
        result.cssText = Processing.processDesignFormCssOut(this.$inputStyle);
        return result;
    }

    connectedCallback(){
        this.appendChild($template.content.cloneNode(true));
        this.$inputStyle = this.querySelectorAll(".js-ip-style");
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if(attrName == "data"){
            let myData = JSON.parse(newValue);
            let styleObj = Processing.formCssTextToCssObject(myData.cssText);
            // cài đặt css
            for (let i = 0; i < this.$inputStyle.length; i++) {
                if(styleObj[this.$inputStyle[i].kindcss] != null){
                    this.$inputStyle[i].value = styleObj[this.$inputStyle[i].kindcss];
                }else{
                    this.$inputStyle[i].value = "";
                }
            }
        }
    }
}

window.customElements.define("design-page-form",DesignPageForm);