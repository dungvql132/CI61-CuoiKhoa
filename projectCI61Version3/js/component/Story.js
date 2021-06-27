import Processing from "../dataProcessing/Processing.js";
const $template = document.createElement("template");

$template.innerHTML = `
    <div class="js-story"></div>
`

export default class Story extends HTMLElement {
    constructor() {
        super();
        // this.appendChild($template.content.cloneNode(true));

    }

    static get observedAttributes() {
        return ["data", "selected"]
    }

    get data() {
        return this.getAttribute("data")
    }

    set data(string) {
        this.setAttribute("data", string)
    }

    get selected() {
        return this.getAttribute("selected")
    }

    set selected(string) {
        this.setAttribute("selected", string)
    }

    get $pages(){
        let $divs = this.querySelectorAll(".js-page");
        let result = [];
        $divs.forEach((element) =>{
            result.push(element.parentNode)
        })
        return result;
    }

    get size(){
        let $divs = this.querySelectorAll(".js-page");
        return $divs.length;
    }

    get dataHTML() {
        let result = []
        let textBoxs = this.querySelectorAll(".js-page")
        textBoxs.forEach((element) => {
            console.log("du lieu luu vao:");
            console.log(element.parentNode.dataHTML);
            result.push(element.parentNode.dataHTML);
        })
        // console.log(result);
        return JSON.stringify(result);
    }

    renderData() {
        this.myData = JSON.parse(this.data);
        this.myData.forEach(element => {
            Processing.createPage(this.$story,element)
            // this.$story.appendChild(Processing.createPage(element));
        });
    }

    createNewPage() {
        let newPage = document.createElement("story-page");
        newPage.appear = "ko";
        this.$story.appendChild(newPage);
        setChonTong(this.selected,this.size)
    }

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$story = this.querySelector(".js-story")
        if(this.data == null){
            // console.log("null");
            // this.createNewPage();
            // this.createNewPage();
            // this.createNewPage();
        }else{
            // console.log("ko null");
            this.renderData();
        }
        // this.selected = 0;
        setChonTong(this.selected,this.size)
        // console.log(this.size);
        // Processing.addEventPage(this.$page);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if( attrName == "data"){
            if(this.data == "1"){
                this.createNewPage();
                // this.createNewPage();
            }else{
                this.renderData();
            }      
            this.selected = 0;
            setChonTong(this.selected,this.size)
        } else if( attrName == "selected"){
            console.log("doi gia tri");
            if(oldValue != null){
                this.$pages[Number(oldValue)].appear = "ko"
            }
            if(newValue != null){
                // console.log(this.$pages[Number(newValue)]);
                this.$pages[Number(newValue)].appear = "ok"
            }
            setChonTong(this.selected,this.size)
        }
    }
}

window.customElements.define("story-maked", Story);