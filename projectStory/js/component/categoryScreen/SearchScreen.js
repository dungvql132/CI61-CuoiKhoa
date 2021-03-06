import Avatar from "../avatarComponent.js";

const $template = document.createElement("template");

$template.innerHTML = `
<div class= "search-screen">

</div>
`;

export default class SearchScreen extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$searchScreen = this.querySelector(".search-screen");
  }

  static get observedAttributes() {
    return ["data"];
  }

  get data() {
    return this.getAttribute("data");
  }

  set data(string) {
    this.setAttribute("data", string);
  }

  async connectedCallback() {
    // this.$naturalScreen = this.querySelector(".search-screen");
  }

  async attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "data") {
        this.$searchScreen.innerHTML = "";
      let response = await firebase.firestore().collection("storys").get();
      let avatar;
      let ok = false;
      response.docs.forEach((element) => {
        try {
            if (element.data().title.search(newValue) != -1) {
                ok = true;
                avatar = new Avatar();
                avatar.data = element.data().id;
                this.$searchScreen.appendChild(avatar);
              }
        } catch (error) {
            
        }
      });
      if (!ok) {
        this.$searchScreen.innerHTML = "khong tim thay truyen can tim";
      }
    }
  }
}

window.customElements.define("search-screen", SearchScreen);
