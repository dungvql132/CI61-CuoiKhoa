import Processing from "../dataProcessing/Processing.js";

const $template = document.createElement("template");

$template.innerHTML = `
    <div class="js-label"></div>
    <select class="js-select">

    </select>
`

export default class InputDropdown extends HTMLElement {
    constructor() {
        super();
        // this.appendChild($template.content.cloneNode(true));

    }
    get text(){
        return this.getAttribute("text")
    }

    get data(){
        return this.getAttribute("data")
    }

    set data(string){
        this.setAttribute("data",string)
    }

    get value(){
        return this.getAttribute("value")
    }

    set value(string){
        this.setAttribute("value",string)
    }

    static get observedAttributes() {
        return ["data" , 'value', "text", "givedata", "keepdata", "kindcss"]
        // data là 1 mảng các giá trị cần được cho vào trong để chọn. Loại array, ví dụ ["dung","dep","zai"]
        // value là 1 giá trị để cài đặt hiển thị bên ngoài. Loại string, ví dụ "dep" 
        // text là 1 giá trị để cài đặt hiển thị thể loại các biến. Loại string, ví dụ "border-style" hoặc "animation-class"
        // kindcss để xác định loại style cần trả về theo định dạng : (style:value;) ví dụ: height:100px;
        // nếu kindcss là rỗng thì sẽ trả về giá trị : value 
    }

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$select = this.querySelector(".js-select");
        
        let myOption = Processing.processInputDropdownIn(this.data);
        myOption.forEach((element) => {
            this.$select.add(element);
        })

        this.$label = this.querySelector(".js-label");
        this.$label.innerHTML = this.text;
        console.log(this.text);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if( attrName == "data"){
            this.$select.add(document.createElement("option"))
            let myOption = Processing.processInputDropdownIn(newValue);
            myOption.forEach((element) => {
                this.$select.add(element);
            })
        }else if (attrName == "value"){
            for (let i = 0; i < this.$select.length; i++) {
                if(this.$select.options[i].text == newValue){
                    this.$select.selectedIndex = i;
                    return;
                }
            }
            this.$select.selectedIndex = 0;
        }
    }
}

window.customElements.define("input-dropdown", InputDropdown);