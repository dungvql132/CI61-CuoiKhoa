import { login } from "../models/users.js";

const $template = document.createElement("template");

$template.innerHTML = `
<form class="login-form">
<h2>Welcome to Webstory</h2>
<div class="login-text">Đăng nhập để xem thêm</div>
<input-data class="email" type="email" placeholder="Điền email của bạn" error=""></input-data>
<input-data class="password" type="password" placeholder="Điền password của bạn" error=""></input-data>
<button class="login-btn">Login</button>
<p class="register-line">Bạn chưa có tài khoản? <p class="register">Đăng ký ngay</p></p>
</form>
`;

export default class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$loginForm = this.querySelector(".login-form");
    this.$email = this.querySelector(".email");
    this.$password = this.querySelector(".password");
    this.$loginBtn = this.querySelector(".login-btn");
    this.$resgiter = this.querySelector(".register")

  }

  connectedCallback() {
    this.$loginForm.onsubmit = async (event) => {
      event.preventDefault();
      let email = this.$email.value;
      let password = this.$password.value;

      let isPassed =
        this.$email.validate((value) => value != "", "Invalid email") &
        this.$password.validate((value) => value != "", "Invalid password");

      if (isPassed) {
        try {
          await login(email, password);
          console.log("Đăng nhập thành công");
          router.navigate('/home');

        } catch (error) {
          alert(error.message);
        }
      }
    };

    this.$resgiter.addEventListener("click", async () => {
      router.navigate('/register');
    })

  }
}

window.customElements.define("login-form", LoginForm);
