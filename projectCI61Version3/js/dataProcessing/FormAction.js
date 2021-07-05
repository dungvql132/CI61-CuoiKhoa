// hiển thị ra phần điều chỉnh data
function apearProcess(obj) {
    let arrBtn = document.querySelectorAll(".appear-process");
    let arrProcessData = document.querySelectorAll(".data-process");

    for (let i = 0; i < arrBtn.length; i++) {
        if (arrBtn[i] == obj) {
            arrProcessData[i].classList.toggle("disappear");
            return;
        }
    }
}

// xử lý khi chọn text-box

let currentTextBox;
let pickedTextBox;
let myForm = document.querySelector("design-form");

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
    if (currentTextBox != null && currentTextBox != pickedTextBox) {
        currentTextBox.removeClass = 'text-box-picked';
    }
    currentTextBox = pickedTextBox;
    pickedTextBox = null;
    if (currentTextBox == null) {
        myForm.data = JSON.stringify("");
    }
    // console.log(currentTextBox.cssText);
}

function saveTextBoxData() {
    if (currentTextBox != null) {
        currentTextBox.data = myForm.dataHTML;
    }
    // console.log(myForm.dataHTML);
    updatePage();
}

function deletaCurrentTextBox() {
    if (currentTextBox != null) {
        try {
            currentTextBox.parentNode.removeChild(currentTextBox);
            currentTextBox = null;
            myForm.data = JSON.stringify("");
        } catch (error) { }
    }
}

// xu ly page
let currentPage;

function createTextBox() {
    if (currentPage != null) {
        currentPage.createNewTextBox();
    }
}

function updatePageForm() {
    let pageForm = document.querySelector("design-page-form");
    let data = {
        cssText: '',
        innerHTML: '',
        animation: ''
    }
    data.cssText = currentPage.cssText;
    pageForm.data = JSON.stringify(data)
}

function updatePage() {
    let pageForm = document.querySelector("design-page-form");
    currentPage.cssText = pageForm.dataHTML.cssText;
}

function selectThisPage(page) {
    currentPage = page;
}

function nextPage() {
    let myStory = document.querySelector(".js-story").parentNode;

    if (Number(myStory.selected) != (Number(myStory.size) - 1)) {
        myStory.selected = Number(myStory.selected) + 1;
    }

    currentTextBox = null;
    myForm.data = JSON.stringify("");
    updatePageForm();
}

function frontPage() {
    let myStory = document.querySelector(".js-story").parentNode;

    if (Number(myStory.selected) != 0) {
        myStory.selected = Number(myStory.selected) - 1;
    }

    currentTextBox = null;
    myForm.data = JSON.stringify("");
    updatePageForm();
}

function createPage() {
    let myStory = document.querySelector(".js-story").parentNode;
    myStory.createNewPage();
}

// ======================= STORY ===================================
function setChonTong(a, b) {
    document.getElementById("chon").innerHTML = Number(a) + 1;
    document.getElementById("tong").innerHTML = b;
}

// dieu chinh icon 
function changeIcon(obj){
    let $design = document.querySelectorAll(".form-data")
    let $designIcon = document.querySelectorAll(".designIcon")
    for (let index = 0; index < $designIcon.length; index++) {
        $design[index].classList.add("disappear")
        if(obj == $designIcon[index]){
            $design[index].classList.remove("disappear")
        }
    }
}