const $template = document.createElement("template");

$template.innerHTML = `
    <div class="js-story">
        <view-story-page></view-story-page>
    </div>
`

export default class ViewStory extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
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

    get $pages() {
        let $divs = this.querySelectorAll(".js-page");
        let result = [];
        $divs.forEach((element) => {
            result.push(element.parentNode)
        })
        return result;
    }

    renderData(select) {
        let myData = JSON.parse(this.data);
        // this.$story.innerHTML = ""
        this.$page.data = myData.pages[Number(select)];
        // console.log(this.$page.data);

        this.$story.style.cssText = `height : ${myData.size.height}px; width : ${myData.size.width}px;`;
        let position = { top: '0', left: '0' };
        let scale = Number(this.mySize.height) / Number(myData.size.height);
        position.top = Number(myData.size.height) * (scale -1) / 2;
        position.left = Number(myData.size.width) * (scale-1) / 2;
        // let numberCondition;
        this.$story.style.cssText += `position: absolute;top : ${position.top}px;left : ${position.left}px;`;
        this.$story.style.cssText += `transform: scale(${scale},${scale});`;
    }

    async connectedCallback() {
        // this.appendChild($template.content.cloneNode(true));
        this.$story = this.querySelector(".js-story")
        this.$page = this.querySelector("view-story-page")
        let coverStory = document.getElementById("cover-story");

        this.mySize = { height: coverStory.offsetHeight, width: '' };
        this.mySize.width = coverStory.offsetHeight * 3 / 4;
        coverStory.style.height = this.mySize.height + "px";
        coverStory.style.width = this.mySize.width + "px";

        // fix cung du lieu 
        // await firebase.auth().signInWithEmailAndPassword("dungdz@gmail.com", "123456");
        let currentUser = await firebase.auth().currentUser;
        let user = await firebase.firestore().collection("users").doc(currentUser.uid).get();

        let myStory = await firebase.firestore().collection("storys").doc(user.data().idViewStory).get();
        this.data = myStory.data().data;
        this.selected = 0;

        let myData = JSON.parse(this.data);
        this.size = myData.pages.length;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        // console.log("bien doi value");
        if (attrName == "data") {
            let myData = JSON.parse(this.data);
            this.size = myData.pages.length;
            this.selected = 0;
        } else if (attrName == "selected") {
            if(Number(this.selected) >= this.size){
                this.selected = this.size-1;
                return;
            }else if(Number(this.selected) < 0){
                this.selected = 0;
                return;
            }else{
                this.renderData(this.selected)
                document.querySelector(".number-page").innerHTML = Number(this.selected)+1+" / "+this.size;
            }    
        }
    }
}

window.customElements.define("view-story-maked", ViewStory);