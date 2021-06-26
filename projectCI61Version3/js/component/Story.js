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

    }

    renderData() {
        this.myData = JSON.parse(this.data);
        this.myData.forEach(element => {
            
        });
    }

    createNewPage() {
        let newPage = document.createElement("story-page");
        newPage.appear = "ko";
        this.$story.appendChild(newPage);
    }

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$story = this.querySelector(".js-story")
        if(this.data == null){
            this.createNewPage()
            this.createNewPage()
            this.createNewPage()
            this.selected = 0;
        }
        console.log(this.size);
        // Processing.addEventPage(this.$page);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if( attrName == "data"){
            // this.renderData();
        } else if( attrName == "selected"){
            if(oldValue != null){
                this.$pages[Number(oldValue)].appear = "ko"
            }
            if(newValue != null){
                console.log(this.$pages[Number(newValue)]);
                this.$pages[Number(newValue)].appear = "ok"
            }
        }
    }
}

window.customElements.define("story-maked", Story);