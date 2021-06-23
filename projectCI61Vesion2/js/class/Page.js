import MyPage from "../componentJS/MyPage.js";
import TextBox from "./TextBox.js";

class Page {
    TextBoxs = [];

    constructor() {
        this.TextBoxs = [];
    }

    addTextBox(TextBox) {

    }

    createNewTextBox() {
        let textBox = new TextBox();
        this.TextBoxs.push(textBox);
    }

    get toDom() {
        let result = document.createElement("my-page");
        result.data = JSON.stringify(this.TextBoxs);
        return result;
    }
}

let a = new Page();
a.createNewTextBox();
a.createNewTextBox();


document.getElementById("design-place").appendChild(a.toDom)