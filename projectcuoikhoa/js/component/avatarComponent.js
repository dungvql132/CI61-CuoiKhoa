
const $template = document.createElement("template");

$template.innerHTML = `
<div class="grid-item">
    <img
        src=""
        class="grid-pic"
         alt=""/>
    <div class="title"></div>
</div>
`;

export default class Avatar extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$img = this.querySelector(".grid-pic")
    this.$title = this.querySelector(".title")
    this.addEventListener("click", async () => {
        // await firebase.auth().signInWithEmailAndPassword("dungdz@gmail.com", "123456")
        console.log(this.data);
        let currentUser = await firebase.auth().currentUser;
        console.log(currentUser.uid);
     await firebase.firestore().collection("users").doc(currentUser.uid).update({idViewStory : this.data});

        //chuyen huong
        router.navigate('/present'); 
    })
  }



  get data() {
    return this.getAttribute("data");
  }

  set data(string) {
    return this.setAttribute("data", string);
  }

  async render() {
      let doc = await firebase.firestore().collection("storys").doc(this.data).get();
      let myObj = doc.data();
      
      this.$title.innerHTML = myObj.title;
    //   console.dir(this.$img);
      this.$img.src = myObj.page;
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
      if(attrName == "data"){
          this.render();
      }
  }
}

window.customElements.define("story-avatar", Avatar);
