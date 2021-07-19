import Avatar from "../avatarComponent.js";


const $template = document.createElement("template");

$template.innerHTML = `
<div class= "love-screen">

</div>
`

export default class LoveScreen extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$loveScreen = document.querySelector(".love-screen")
    }

    static get observedAttributes() {
    }
    async connectedCallback() {
        let response = await firebase.firestore().collection("storys").get();
        let avatar;
        response.docs.forEach(element => {  
    
            avatar = new Avatar();
            console.log(element.data().kinds);
            if (element.data().kinds == "Tình yêu") {
            avatar.data = element.data().id;
            this.$loveScreen.appendChild(avatar)
            console.log(element.data());
        }
    
        });
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
    }
}

window.customElements.define("love-screen", LoveScreen);