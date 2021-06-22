import StyleMyBox from "../treat/StyleMyBox.js";
const $template = document.createElement("template");

$template.innerHTML = `
<div class="my-form">
          <!--  -->
          <div class="design-place-element">
            <div  class="design-place-element-label flex"  onclick="appearDiv(this)">
              <div class="label-arrow">=></div>
              <div class="label-text">resize</div>
            </div>
            <div class="design-place-element-input flex disappear">
              <input-wrapper type="number" csselement="height"></input-wrapper>
              <input-wrapper type="number" csselement="width"></input-wrapper>
            </div>
          </div>
          <!--  -->
          <!--  -->
          <div class="design-place-element">
            <div  class="design-place-element-label flex"  onclick="appearDiv(this)">
              <div class="label-arrow">=></div>
              <div class="label-text">position</div>
            </div>
            <div class="design-place-element-input flex disappear">
              <input-wrapper type="number" csselement="top"></input-wrapper>
              <input-wrapper type="number" csselement="left"></input-wrapper>
            </div>
          </div>
          <!--  -->
          <!--  -->
          <div class="design-place-element">
            <div  class="design-place-element-label flex"  onclick="appearDiv(this)">
              <div class="label-arrow">=></div>
              <div class="label-text">text</div>
            </div>
            <div class="design-place-element-input flex disappear">
              <input-wrapper type="text" csselement="imformation" class="js-innerHTML"></input-wrapper>
              <input-wrapper type="color" csselement="color"></input-wrapper>
              <input-wrapper type="number" csselement="font-size"></input-wrapper>
              <input-wrapper type="text" csselement="font-family"></input-wrapper>
            </div>
          </div>
          <!--  -->
          <!--  -->
          <div class="design-place-element">
            <div  class="design-place-element-label flex"  onclick="appearDiv(this)">
              <div class="label-arrow">=></div>
              <div class="label-text">border</div>
            </div>
            <div class="design-place-element-input flex disappear">
              <input-wrapper type="number" csselement="border-radius"></input-wrapper>
              <input-wrapper type="number" csselement="border-width"></input-wrapper>
              <input-wrapper type="text" csselement="border-style"></input-wrapper>
              <input-wrapper type="color" csselement="border-color"></input-wrapper>
            </div>
          </div>
          <!--  -->
          <!--  -->
          <div class="design-place-element">
            <div  class="design-place-element-label flex"  onclick="appearDiv(this)">
              <div class="label-arrow">=></div>
              <div class="label-text">padding</div>
            </div>
            <div class="design-place-element-input flex disappear">
              <input-wrapper type="number" csselement="padding-left"></input-wrapper>
              <input-wrapper type="number" csselement="padding-right"></input-wrapper>
              <input-wrapper type="number" csselement="padding-top"></input-wrapper>
              <input-wrapper type="number" csselement="padding-bottom"></input-wrapper>
            </div>
          </div>
          <!--  -->
          <!--  -->
          <div class="design-place-element">
            <div  class="design-place-element-label flex"  onclick="appearDiv(this)">
              <div class="label-arrow">=></div>
              <div class="label-text">background</div>
            </div>
            <div class="design-place-element-input flex disappear">
              <input-wrapper type="color" csselement="background-color"></input-wrapper>
              <input-wrapper type="text" csselement="background-image"></input-wrapper>
            </div>
          </div>
          <!--  -->  
        </div>
`

export default class DesignForm extends HTMLElement {
  constructor() {
    super();
    // this.appendChild($template.content.cloneNode(true));

  }

  static get observedAttributes() {
    return ["data", "innerhtml"]
  }

  get data() {
    return this.getAttribute("data");
  }

  set data(string) {
    this.setAttribute("data", string);
  }

  get innerhtml() {
    return this.getAttribute("innerhtml");
  }

  set innerhtml(string) {
    this.setAttribute("innerhtml", string);
  }

  get DataHTML() {
    let result = {
      css:"",
      class:'',
      innerHTML:''
    }
    this.$inputs.forEach((element) => {
      result.css += element.DataHTML;
    })
    result.innerHTML = StyleMyBox.getInforFromCss(this.$innerHTML.DataHTML);
    return result;
  }

  connectedCallback() {
    this.appendChild($template.content.cloneNode(true));
    this.$inputs = this.querySelectorAll('.js-input-wrapper');
    this.$innerHTML = this.querySelector('.js-innerHTML');
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "data") {
      let myObj = StyleMyBox.formCssTextToCssObject(newValue);
      // console.log(myObj);
      this.$inputs.forEach((element) => {
        // console.log(element.csselement);
        if (myObj[element.csselement] != null) {
          element.value = myObj[element.csselement];
        } else {
          element.value = '';
        }
      })
    } else if (attrName == "innerhtml") {
      this.$innerHTML.value = newValue;
    }
  }
}

window.customElements.define("my-form", DesignForm);