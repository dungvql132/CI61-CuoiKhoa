const $template = document.createElement("template");

$template.innerHTML = `
<div id="read-story">
    <div id="read-story-left">
        <div class="logo"> TRANG CHỦ </div>
    </div>

    <div id="read-story-right">
        <button class="btn-front change-page-btn"><img src="img/leftArrow.png" alt="" class="arrow-change-page"> </button>
        <div>
            <p class="number-page"></p>
            <div id="cover-story">
                <view-story-maked></view-story-maked>
            </div>
        </div>
        <button class="btn-next change-page-btn"><img src="img/rightArrow.png" alt="" class="arrow-change-page"> </button>
    </div>
</div>
`

export default class ReadStoryScreen extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.querySelector(".btn-front").addEventListener("click", () => {
            let story = document.querySelector("view-story-maked");
            story.selected = Number(story.selected) - 1;
        })
        
        this.querySelector(".btn-next").addEventListener("click", () => {
            let story = document.querySelector("view-story-maked");
            story.selected = Number(story.selected) + 1;
        })
    }

    static get observedAttributes() {
        return []
    }
    connectedCallback() {

    }

    attributeChangedCallback(attrName, oldValue, newValue) {
    }
}

window.customElements.define("read-story-screen", ReadStoryScreen);