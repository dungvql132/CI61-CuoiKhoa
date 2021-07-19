const $template = document.createElement("template");

$template.innerHTML = `
<div class="top-bar">
<div class="welcome-name" style= "display:none">Chào mừng: <p class="login-name"></p></div>
<div class="sign-inup">
    <p class="signin">Đăng nhập</p>
    <p class="signup">Đăng ký</p>
</div>
<p class="signout" style= "display:none">Đăng xuất</p>

  </div>
`;

export default class TopBar extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$topBar = this.querySelector(".top-bar");
    this.$signin = this.querySelector(".signin");
    this.$signup = this.querySelector(".signup");
    this.$welcomeName = this.querySelector(".welcome-name");
    this.$loginName = this.querySelector(".login-name");
    this.$signout = this.querySelector(".signout");
  }
  async connectedCallback() {
    this.$signin.onclick = () => {
      router.navigate("/login");
    };
    this.$signup.onclick = () => {
      router.navigate("/register");
    };
    let currentUser = await firebase.auth().currentUser;
    let loginUser = await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get();

    if (currentUser != null) {
      this.$welcomeName.style.display = "block";
      this.$loginName.innerHTML = loginUser.data().name;
      this.$signup.style.display = "none";
      this.$signin.style.display = "none";
      this.$signout.style.display = "block";
      this.$signout.onclick = () => {
        firebase.auth().signOut();
        router.navigate("/home");
        this.$signout.classList.toggle("disappear");
        this.$welcomeName.classList.toggle("disappear");
        this.$signin.style.display = "block";
        this.$signup.style.display = "block";
      };
    }
  }
}

window.customElements.define("top-bar", TopBar);
