import { reload } from "../js/dataProcessing/firebase.js";
import Processing from "../js/dataProcessing/Processing.js";

const $template = document.createElement("template");

$template.innerHTML = `
<div id="design" class="flex fadeIn">
<div id="design-area">
    <button class="btn-changepage btn-front-page" onclick="frontPage()" style="background-image: url(./designVsReadStory/img/leftArrow.png);"></button>
    <div class="design-field">
        <div class="ngang"><p id="chon"></p><p>/</p><p id="tong"></p></div>
        <div id="cover-story"> <story-maked></story-maked> </div>
    </div>
    <button class="btn-changepage btn-next-page" onclick="nextPage()" style="background-image:url(./designVsReadStory/img/rightArrow.png);"></button>
</div>

<div id="design-form">   
    <div class="design-form-top">
        <div class="icon-list">
            <button class="designIcon" onclick="changeIcon(this)"><i class="fas fa-th-large"></i></button>
            <button class="designIcon" onclick="changeIcon(this)"><i class="far fa-file-alt"></i></button>
            <button class="designIcon" onclick="changeIcon(this)"><i class="fas fa-book"></i></button>
        </div>
        <div class="type-design">
            <design-form></design-form>
            <design-page-form></design-page-form>
            <design-story-form></design-story-form>
        </div>
    </div>
    <div class="form-action">
        <div>
            <button onclick="createTextBox()"><i class="fas fa-plus"></i><p>Khung</p></button>
            <button onclick="createPage()"><i class="fas fa-plus"></i><p>Trang</p></button>

        </div>
        <div>
            <button onclick="deletaCurrentTextBox()"><i class="fas fa-times"></i><p>Khung</p></button>
            <button onclick="deleteCurrentPage()"><i class="fas fa-times"></i><p>Trang</p></button>
        </div>
        <div>
            <button onclick="saveTextBoxData()">Lưu Trang</button>   
            <button id="btn-saveStory">Lưu Truyện</button>
        </div>
        <button class="quitBtn">Thoát</button>
    </div>
</div>
</div>
`

export default class DesignScreen extends HTMLElement{
    constructor(){
        super();
        // this.appendChild($template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["data"]
    }

    reloadScreen(){
        reload();
    }

    addSomeEvent(){
        document.getElementById("btn-saveStory").addEventListener("click", () =>  {
            let storyForm = document.querySelector("design-story-form");
            // console.log(storyForm.dataHTML);
         Processing.saveStoryToFireBase(storyForm.dataHTML);
         alert("Truyện đã được lưu thành công!");
        })
        let designarea = document.getElementById("design-area");
        designarea.addEventListener("mousedown", whenClickDesignArea)
    }

    connectedCallback(){
        this.appendChild($template.content.cloneNode(true));
        this.addSomeEvent();
        this.reloadScreen();
        this.querySelector('.quitBtn').onclick = () => {
            router.navigate("/home")
        }
        
    }

    attributeChangedCallback(attrName, oldValue, newValue) {

    }
}

window.customElements.define("design-screen",DesignScreen);