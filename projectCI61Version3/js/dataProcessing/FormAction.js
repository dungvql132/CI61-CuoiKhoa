
// hiển thị ra phần điều chỉnh data
function apearProcess(obj){
    let arrBtn = document.querySelectorAll(".appear-process");
    let arrProcessData = document.querySelectorAll(".data-process");

    for(let i = 0; i<arrBtn.length; i++){
        if(arrBtn[i] == obj){
            arrProcessData[i].classList.toggle("disappear");
            return;
        }
    }
}

// xử lý khi chọn text-box

let currentTextBox;
let pickedTextBox;
let myForm = document.querySelector(".my-form");

function whenClickTextBox(obj) {
    // console.log("con");
    pickedTextBox = obj;
    changeDataForm(obj)
    obj.addClass = 'text-box-picked';
}

function changeDataForm(obj) {
    myForm.data = obj.data;
}

function whenClickDesignArea() {
    // console.log("cha");
    if(currentTextBox != null && currentTextBox != pickedTextBox){
        currentTextBox.removeClass = 'text-box-picked';
    }
    currentTextBox = pickedTextBox;
    pickedTextBox = null;
    if(currentTextBox == null){
        myForm.data = JSON.stringify("");
    }
    // console.log(currentTextBox.cssText);
}

function saveTextBoxData() {
    currentTextBox.data = myForm.dataHTML;
    // console.log(myForm.dataHTML);
    let page = document.querySelector(".js-story-page");
    localStorage.setItem("my-page",page.dataHTML)
}

function deletaCurrentTextBox() {
    if(currentTextBox != null){
        try {
            currentTextBox.parentNode.removeChild(currentTextBox);
            currentTextBox = null;
            myForm.data = JSON.stringify("");
        } catch (error) {}
    }
}

function createTextBox() {
    let page = document.querySelector(".js-story-page");
    page.createNewTextBox();
    // console.log(page.dataHTML);
}
