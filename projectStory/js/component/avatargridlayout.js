import Avatar from "./avatarComponent.js";

const $template = document.createElement("template");

$template.innerHTML = `
<div class="gridlayout">
</div>
`;

export default class AvatarGridLayout extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    
  }


  async connectedCallback(){
    this.$gridlayout = this.querySelector(".gridlayout");
    let response = await firebase.firestore().collection("storys").get();
    let avatar;
    response.docs.forEach(element => {  

        avatar = new Avatar();
        avatar.data = element.data().id;
        this.$gridlayout.appendChild(avatar)
        // console.log(element.data());

    });
 
  }


  attributeChangedCallback(attrName, oldValue, newValue) {
    
  }
  
}


window.customElements.define("avatar-grid", AvatarGridLayout);
