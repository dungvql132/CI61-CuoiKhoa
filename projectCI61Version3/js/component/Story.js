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
        let result = {
            pages : [],
            size : {height : "",width : ""}
        }
        let pages = this.querySelectorAll(".js-page")
        pages.forEach((element) => {
            result.pages.push(element.parentNode.dataHTML);
        })
        let myData;
        if(this.data == ''){
            myData = {};
        }else{
            myData = JSON.parse(this.data);
        }
        // console.log("data cua t day nay: ");
        // console.log(myData);
        if(myData.size == null || myData.size.height == ''){
            // console.log("vao my size");
            result.size.height = this.mySize.height;
            // console.log("xong height");
            result.size.width = this.mySize.width;
            // console.log(this.mySize);
        }else{
            result.size.height = myData.size.height;
            result.size.width = Number(myData.size.height)*3/4;
        }
        return JSON.stringify(result);
    }

    renderData() {
        // console.log("go render");
        let myData = JSON.parse(this.data);
        this.$story.innerHTML = ""
        // console.log(myData);
        myData.pages.forEach(element => {
            Processing.createPage(this.$story,element)
            // this.$story.appendChild(Processing.createPage(element));
        });
        if(myData.size.height == '' || myData.size == null){
            this.$story.style.height = this.mySize.height + "px";
            this.$story.style.width = this.mySize.width + "px";
        }else{
            this.$story.style.cssText = `height : ${myData.size.height}px; width : ${myData.size.width}px;`;
            let position = {top : '',left: ''};
            scale = Number(this.mySize.height)/Number(myData.size.height);
            position.top = Number(myData.size.height)*(1-scale)/2;
            position.left = Number(myData.size.width)*(1-scale)/2;
            this.$story.style.cssText += `top : -${position.top}px;left : -${position.left}px;`;
            this.$story.style.cssText += `transform: scale(${scale},${scale});`;
        }
        if(JSON.stringify(myData) != this.data){
            this.data = this.dataHTML;
        }
    }

    createNewPage() {
        let newPage = document.createElement("story-page");
        newPage.appear = "ko";
        this.$story.appendChild(newPage);
        setChonTong(this.selected,this.size)
    }

    detelePage(){
        if(this.size <= 1){
            return;
        }else{
            currentPage.parentNode.removeChild(currentPage);
            this.selected = this.selected;
        }
    }

    connectedCallback() {
        this.appendChild($template.content.cloneNode(true));
        this.$story = this.querySelector(".js-story")
        let coverStory = document.getElementById("cover-story");
        setChonTong(this.selected,this.size)

        this.mySize = {height : coverStory.offsetHeight,width : ''};
        this.mySize.width = coverStory.offsetHeight*3/4;
        coverStory.style.height = this.mySize.height+"px";
        coverStory.style.width = this.mySize.width+"px";
        console.dir(coverStory);
        // console.log(this.mySize);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        // console.log("bien doi value");
        if( attrName == "data"){
            // console.log("chinh sua data");
            if(this.data == null || this.data == ''){
                this.$story.innerHTML = '';
                this.createNewPage();
            }else{
                this.renderData();
            }      
            this.selected = 0;
            setChonTong(this.selected,this.size)
        } else if( attrName == "selected"){
            if(this.selected >= this.size){
                this.selected = this.size-1;
                return;
            }
            // console.log("doi gia tri");
            if(oldValue != null && this.$pages[Number(oldValue)] != null){
                this.$pages[Number(oldValue)].appear = "ko"
            }
            if(newValue != null && this.$pages[Number(newValue)] != null){
                // console.log(this.$pages[Number(newValue)]);
                this.$pages[Number(newValue)].appear = "ok"
                currentPage = this.$pages[Number(newValue)];
            }
            setChonTong(this.selected,this.size)
        }
    }
}

window.customElements.define("story-maked", Story);