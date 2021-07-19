import { register } from "../models/users.js";

const $template = document.createElement("template");

$template.innerHTML = `
<form class="register-form">
<h2>Đăng ký tài khoản Webstory</h2>
<div class="register-text">Miễn phí và mãi luôn như vậy</div>
<input-data class="name" type="name" placeholder="Họ và tên" error=""></input-data>
<input-data class="email" type="email" placeholder="Email" error=""></input-data>
<input-data class="password" type="password" placeholder="Password" error=""></input-data>
<input-data class="password-confirmation" type="password" placeholder="Password Confirmation" error=""></input-data>
<button class="register-btn">Register</button>
<p class="sign-in">Bạn đã có tài khoản? Vui lòng <p class="login">đăng nhập</p></p>
</form>
`;

export default class RegisterForm extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$registerForm = this.querySelector(".register-form");
    this.$name = this.querySelector(".name");
    this.$email = this.querySelector(".email");
    this.$password = this.querySelector(".password");
    this.$passwordConfirmation = this.querySelector(".password-confirmation");
    this.$registerBtn = this.querySelector(".register-btn");
    this.$login = this.querySelector(".login")
  }

  connectedCallback() {
    this.$registerForm.onsubmit = async (event) => {
      event.preventDefault();
      let name = this.$name.value;
      let email = this.$email.value;
      let password = this.$password.value;
      let passwordConfirmation = this.$passwordConfirmation.value;

      let isPassed =
        this.$name.validate((value) => {
          return value != "";
        }, "Điền tên đăng nhập") &
        this.$email.validate((value) => {
          return value != "";
        }, "Điền email của bạn") &
        this.$password.validate((value) => {
          return value != "";
        }, "Thiếu password") &
        this.$passwordConfirmation.validate((value) => {
          return value != "" && value == password;
        }, "Thiếu password hoặc không đúng");

      if (isPassed) {
        try {
          await register(name, email, password);
          alert("Register successfully");
          router.navigate('/home');
          let newIdUser = firebase.auth().currentUser.uid;
          firebase.firestore().collection('users').doc(newIdUser).set({
            idEditStory: "",
            idViewStory: "",
            name: name,
          })

        } catch (error) {
          // xử lý lỗi
          alert(error.message);
        }
        console.log("This code must be executed");
      }
    }

    this.$login.addEventListener("click", async () => {
      router.navigate('/login');
    })

  }
}

window.customElements.define("register-form", RegisterForm);
