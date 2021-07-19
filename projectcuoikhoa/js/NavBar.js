import { createNewStory } from "./main.js";

const $template = document.createElement("template");

$template.innerHTML = `
<div class="head-text">
<h1 style="user-select: none;">Welcome to our Webstory</h1>
</div>
<div class=nav-bar>
<div class="cate-content">
<p class="home-btn">TRANG CHỦ</p>
<p class="love">TÌNH YÊU</p>
<p class="animal">ĐỘNG VẬT</p>
<p class="human">CON NGƯỜI</p>
<p class= "natural">THIÊN NHIÊN</p>

<div class="search-container">
  <span class="icon" style = "user-select: none;">
    <i class="fa fa-search" class="search-icon"></i>
  </span>   
  <div class="search-content disappear">
   <input type="search" id="search" placeholder="Bạn tìm gì..." />
   <button type="submit" class="search-btn">Search</button>
  </div>
</div>
</div>
<button class="create-story">Tạo Story mới</button>
</div>
`;

export default class NavBar extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$iconSearch = document.querySelector(".icon");
    this.$search = document.querySelector("#search");
    this.$searchContent = document.querySelector(".search-content");
    this.$searchBtn = document.querySelector(".search-btn");
    this.$homeBtn = document.querySelector(".home-btn");
    this.$createStory = document.querySelector(".create-story");
    this.$animalBtn = document.querySelector(".animal");
    this.$humanBtn = document.querySelector(".human");
    this.$loveBtn = document.querySelector(".love");
    this.$naturalBtn = document.querySelector(".natural");

  }
  connectedCallback() {
    this.$iconSearch.onclick = () => {
      this.$searchContent.classList.toggle("disappear")
      if(document.getElementById("container").offsetWidth < 1250){
        this.$loveBtn.classList.toggle("disappear")
        this.$animalBtn.classList.toggle("disappear")
        this.$humanBtn.classList.toggle("disappear")
        this.$naturalBtn.classList.toggle("disappear")
      }else{
        this.$loveBtn.classList.remove("disappear")
        this.$animalBtn.classList.remove("disappear")
        this.$humanBtn.classList.remove("disappear")
        this.$naturalBtn.classList.remove("disappear")
      }
    };
    this.$searchBtn.onclick = () => {
      router.navigate("/search");
      setTimeout(() => {
        let searchScreen = document.querySelector("search-screen");
        searchScreen.data = this.$search.value;
        if(searchScreen == null){
          setTimeout(() => {
            searchScreen = document.querySelector("search-screen");
            searchScreen.data = this.$search.value;
          }, 1000);
        }
      }, 1000);
    };
    this.$homeBtn.onclick = () => {
      router.navigate("/home");
    };
    this.$createStory.onclick = async () => {
      let currentUser = await firebase.auth().currentUser;
      if (currentUser != null) {
        createNewStory();
        router.navigate("/design");
      } else {
        router.navigate("/login");
      }
    };

    this.$animalBtn.onclick = () => {
      router.navigate("/animal");
    }

    this.$humanBtn.onclick = () => {
      router.navigate("/human");
    }

    this.$naturalBtn.onclick = () => {
      router.navigate("/natural");
    }

    this.$loveBtn.onclick = () => {
      router.navigate("/love");
    }
  }
}

window.customElements.define("nav-bar", NavBar);
