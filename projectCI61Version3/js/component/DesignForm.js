import FormData from "../data/FormData.js";
import Processing from "../dataProcessing/Processing.js";

const $template = document.createElement("template");

$template.innerHTML = `
<div class="form-data">
    <!-- inner HTML -->
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">nội dung</div>
    </div>
    <div class="data-process disappear">
        <input-wrapper class="js-ip-innerHTML" type="text" text="văn bản"></input-wrapper>
    </div>

    <!-- style : kích thước -->
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">kích thước</div>
    </div>
    <div class="data-process disappear">
        <input-wrapper class="js-ip-style" type="number" text="chiều cao" givedata="px" keepdata="number" kindcss="height"></input-wrapper>
        <input-wrapper class="js-ip-style" type="number" text="chiều rộng" givedata="px" keepdata="number" kindcss="width"></input-wrapper>
    </div>

    <!-- style : vị trí -->
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">vị trí</div>
    </div>
    <div class="data-process disappear">
        <input-wrapper class="js-ip-style" type="number" text="bên trên" givedata="px" keepdata="number" kindcss="top"></input-wrapper>
        <input-wrapper class="js-ip-style" type="number" text="bên trái" givedata="px" keepdata="number" kindcss="left"></input-wrapper>
    </div>

    <!-- style : chữ -->
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">chữ</div>
    </div>
    <div class="data-process disappear">
        <input-wrapper class="js-ip-style" type="number" text="cỡ chữ" givedata="px" keepdata="number" kindcss="font-size"></input-wrapper>
        <input-wrapper class="js-ip-style" type="color" text="màu chữ" givedata="rgb" keepdata="hexa" kindcss="color"></input-wrapper>
        <input-dropdown class="js-ip-style js-fontfamily" text="font chữ" kindcss="font-family"></input-dropdown>
    </div>

    <!-- style : nền -->
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">nền</div>
    </div>
    <div class="data-process disappear">
        <input-wrapper class="js-ip-style" type="color" text="màu nền" givedata="rgb" keepdata="hexa" kindcss="background-color"></input-wrapper>
        <input-wrapper class="js-ip-style" type="text" text="ảnh nền" givedata="url" keepdata="string" kindcss="background-image"></input-wrapper>
    </div>

    <!-- style : hieu ung -->
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">hiệu ứng</div>
    </div>
    <div class="data-process disappear">
        <input-dropdown class="js-ip-class js-animationclass" text="hiệu ứng"></input-dropdown>
    </div>
                
    <!-- style : viền -->
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">viền</div>
    </div>
    <div class="data-process disappear">
        <input-dropdown class="js-ip-style js-borderstyle" text="loại viền" kindcss="border-style"></input-dropdown>
        <input-wrapper class="js-ip-style" type="color" text="màu viền" givedata="rgb" keepdata="hexa" kindcss="border-color"></input-wrapper>
        <input-wrapper class="js-ip-style" type="number" text="cỡ viền" givedata="px" keepdata="number" kindcss="border-width"></input-wrapper>
        <input-wrapper class="js-ip-style" type="number" text="đường cong viền" givedata="px" keepdata="number" kindcss="border-radius"></input-wrapper>
    </div>
    
    <!-- style : căn lề trong -->
    <div class="appear-process" onclick="apearProcess(this)">
        <div class="process-icon">></div>
        <div class="process-text">căn lề trong</div>
    </div>
    <div class="data-process disappear">

        <input-wrapper class="js-ip-style" type="number" text="lề trái" givedata="px" keepdata="number" kindcss="padding-left"></input-wrapper>
        <input-wrapper class="js-ip-style" type="number" text="lề phải" givedata="px" keepdata="number" kindcss="padding-right"></input-wrapper>
        <input-wrapper class="js-ip-style" type="number" text="lề trên" givedata="px" keepdata="number" kindcss="padding-top"></input-wrapper>
        <input-wrapper class="js-ip-style" type="number" text="lề dưới" givedata="px" keepdata="number" kindcss="padding-bottom"></input-wrapper>
    </div>
</div>
`

export default class DesignForm extends HTMLElement{
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
        result.innerHTML = this.$inputHTML.dataHTML;
        result.animation = this.$inputAnimation.dataHTML;
        return JSON.stringify(result);
    }

    connectedCallback(){
        this.appendChild($template.content.cloneNode(true));
        this.$inputStyle = this.querySelectorAll(".js-ip-style");
        this.$inputHTML = this.querySelector(".js-ip-innerHTML");
        this.$inputClasses = this.querySelectorAll(".js-ip-class");

        // dropdown
        this.$inputAnimation = this.querySelector(".js-animationclass");
        this.$fontFamily = this.querySelector(".js-fontfamily");
        this.$borderStyle = this.querySelector(".js-borderstyle");

        this.$inputAnimation.data = FormData.animation;
        this.$fontFamily.data = FormData.fonts;
        this.$borderStyle.data = FormData.borderStyle;

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

            // cài đặt innerHTML
            this.$inputHTML.value = Processing.processInputWrapperIn(myData.innerHTML);
            
            // cài đặt animation
            this.$inputAnimation.value = Processing.processInputWrapperIn(myData.animation);
        }
    }
}

window.customElements.define("design-form",DesignForm);