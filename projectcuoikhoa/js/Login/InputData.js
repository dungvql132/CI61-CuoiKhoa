const $template = document.createElement("template");

$template.innerHTML = `
<div class='input-data'>
<input class='input-info' type="text" placeholder="Điền thông tin">
<div class="input-error"></div>
</div>
`;

export default class InputData extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$info = this.querySelector(".input-info");
    this.$error = this.querySelector(".input-error");
  }

  static get observedAttributes() {
    return ["placeholder", "type", "error"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "placeholder") {
      this.$info.placeholder = newValue;
    } else if (attrName == "type") {
        this.$info.type = newValue;
    } else if (attrName == "error") {
        this.$error.innerHTML = newValue;
    }
  }
  get value() {
    return this.$info.value;
  }
  
  validate(condition, message) {
    if(condition(this.value)) {
      this.setAttribute('error', '');
      return true;
    }

    this.setAttribute('error', message);
      return false;
  }

}


window.customElements.define("input-data", InputData);
