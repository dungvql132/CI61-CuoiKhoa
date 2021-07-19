import Avatar from "../avatarComponent.js";


const $template = document.createElement("template");

$template.innerHTML = `
<div class= "human-screen">

</div>
`

export default class HumanScreen extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$humanScreen = document.querySelector(".human-screen")
    }

    static get observedAttributes() {
    }
    async connectedCallback() {
        let response = await firebase.firestore().collection("storys").get();
        let avatar;
        response.docs.forEach(element => {  
    
            avatar = new Avatar();
            if (element.data().kinds == "Con người") {
            avatar.data = element.data().id;
            this.$humanScreen.appendChild(avatar)
        }
    
        });
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
    }
}

window.customElements.define("human-screen", HumanScreen);