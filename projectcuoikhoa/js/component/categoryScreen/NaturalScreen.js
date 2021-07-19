import Avatar from "../avatarComponent.js";


const $template = document.createElement("template");

$template.innerHTML = `
<div class= "natural-screen">

</div>
`

export default class NaturalScreen extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$naturalScreen = document.querySelector(".natural-screen")
    }

    static get observedAttributes() {
        return ["kind"]
    }
    async connectedCallback() {
        let response = await firebase.firestore().collection("storys").get();
        let avatar;
        response.docs.forEach(element => {  
    
            avatar = new Avatar();
            console.log(element.data().kinds);
            if (element.data().kinds == "Thiên nhiên") {
            avatar.data = element.data().id;
            this.$naturalScreen.appendChild(avatar)
            console.log(element.data());
        }
    
        });
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
    }
}

window.customElements.define("natural-screen", NaturalScreen);