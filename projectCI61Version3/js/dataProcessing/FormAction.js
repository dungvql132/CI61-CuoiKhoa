
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
    myForm.data = obj.data;
}

function whenClickDesignArea() {
    // console.log("cha");
    currentTextBox = pickedTextBox;
    pickedTextBox = null;
    if(currentTextBox == null){
        myForm.data = JSON.stringify("");
    }
}

function saveTextBoxData() {
    currentTextBox.data = myForm.dataHTML;
    console.log(myForm.dataHTML);
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
    let page = document.getElementById("design-area");
    page.appendChild(document.createElement("text-box"))
}