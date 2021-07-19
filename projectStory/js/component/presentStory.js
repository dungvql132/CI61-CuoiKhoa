import Avatar from "./avatarComponent.js";

const $template = document.createElement("template");

$template.innerHTML = `
<div class="present-story">
      <div class="avatar-story">
        <div>
          <img
            src=""
            alt=""
            class="profile-pic"
          />
        </div>
        <div class="author-story">Tác giả: <span class="author-story-detail" class="detail"></span></div>
      </div>
      <div class="detail-story">
        <div class="text-story" style="display: flex;flex-direction: column;">
          <p class="name-story">Tên chuyện: <span class="name-story-detail" class="detail"></span></p>
          <p class="date-story">Ngày viết: <span clas="date-story-detail" class="detail"></span></p>
          <p class="dateModified-story">Ngày chỉnh sửa: <span class="dateModified-story-detail" class="detail"></span></p>
          <p class="type-story">Thể loại: <span class="type-story-detail" class="detail"></span></p>
        </div>
        <div class="btn-story">
          <button class="read-story">Đọc truyện</button>
          <button class="modify-story" style= "display: none">Sửa truyện</button>
        </div>
        <div class= "descript">
        <span class="desc-story" ></span>
        </div>
      </div>
    </div>
`;

export default class PresentStory extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$authorStory = this.querySelector(".author-story-detail");
    this.$nameStory = document.querySelector(".name-story-detail");
    this.$dateStory = document.querySelector(".date-story-detail");
    this.$dateModifiedStory = document.querySelector(
      ".dateModified-story-detail"
    );
    this.$typeStory = document.querySelector(".type-story-detail");
    this.$descStory = document.querySelector(".desc-story");
    this.$profilePic = document.querySelector(".profile-pic");
    this.$readStory = document.querySelector(".read-story");
    this.$mofifyStory = document.querySelector(".modify-story");
  }

  static get observedAttributes() {}

  attributeChangedCallback(attrName, oldValue, newValue) {}
  async connectedCallback() {
    let currentUser = await firebase.auth().currentUser;
    if (currentUser == null) {
      router.navigate("./login");
    } else {
      console.log(currentUser.uid);
      let myUser = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get();
        console.log(myUser.data());

      let idViewStory = await myUser.data().idViewStory;
      let idEditStory = await myUser.data().idEditStory;
      let response = await firebase
        .firestore()
        .collection("storys")
        .doc(idViewStory)
        .get();
      // console.log(response.data().id);
      // console.log(this.$authorStory);
     
      let author = await firebase
        .firestore()
        .collection("users")
        .doc(response.data().userId)
        .get();
        console.log("author");
        console.log(author.data());
        this.$authorStory.innerHTML = author.data().name;
      this.$nameStory.innerHTML = response.data().title;
      this.$dateModifiedStory.innerHTML = response.data().dateModified;
      this.$typeStory.innerHTML = response.data().kinds;
      this.$descStory.innerText = response.data().description;
      this.$profilePic.src = response.data().page;

      // console.log(currentUser.uid);
      // console.log(response.data().userId);

        if (currentUser.uid == response.data().userId) {
           this.$mofifyStory.style.display = "block";
           this.$mofifyStory.onclick = async () => {
            await firebase
            .firestore()
            .collection("users")
            .doc(currentUser.uid)
            .update({idEditStory : response.data().id})
            router.navigate("/design");

           }
        }

      this.$readStory.onclick = () => {
        router.navigate("/read");
      };
    }
  }
}


window.customElements.define("present-story", PresentStory);
