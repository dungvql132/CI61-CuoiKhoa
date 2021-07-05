import Processing from "../dataProcessing/Processing.js";
const $template = document.createElement("template");

$template.innerHTML = `
    <div class="js-story"></div>
`

export default class Story extends HTMLElement {
    constructor() {
        super();
        // this.appendChild($template.content.cloneNode(true));
        // console.log("constructor roi");
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
        // console.log("call back roi");
        // if(this.data == null){
        //     this.createNewPage();
        // }else{
        //     this.renderData();
        // }
        // this.selected = 0;
        // this.data = localStorage.getItem("myStory");
        // console.log("add data roi");
        setChonTong(this.selected,this.size)
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        // console.log("bien doi value");
        if( attrName == "data"){
            // console.log("chinh sua data");
            if(this.data == null){
                this.createNewPage();
                // this.createNewPage();
            }else{
                this.renderData();
            }      
            this.selected = 0;
            setChonTong(this.selected,this.size)
        } else if( attrName == "selected"){
            if(this.selected >= this.size){
                this.selected = this.length-1;
            }
            // console.log("doi gia tri");
            if(oldValue != null){
                this.$pages[Number(oldValue)].appear = "ko"
            }
            if(newValue != null){
                // console.log(this.$pages[Number(newValue)]);
                this.$pages[Number(newValue)].appear = "ok"
                currentPage = this.$pages[Number(newValue)];
            }
            setChonTong(this.selected,this.size)
        }
    }
}

window.customElements.define("story-maked", Story);