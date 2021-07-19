import Avatar from "../avatarComponent.js";


const $template = document.createElement("template");

$template.innerHTML = `
<div class= "animal-screen">

</div>
`

export default class AnimalScreen extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$animalScreen = document.querySelector(".animal-screen")
    }

    static get observedAttributes() {
    }
    async connectedCallback() {
        let response = await firebase.firestore().collection("storys").get();
        let avatar;
        response.docs.forEach(element => {  
    
            avatar = new Avatar();
            console.log(element.data().kinds);
            if (element.data().kinds == "Động vật") {
            avatar.data = element.data().id;
            this.$animalScreen.appendChild(avatar)
            console.log(element.data());
        }
    
        });
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
    }
}

window.customElements.define("animal-screen", AnimalScreen);