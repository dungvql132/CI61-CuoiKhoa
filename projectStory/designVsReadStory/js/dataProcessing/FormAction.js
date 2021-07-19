// hiển thị ra phần điều chỉnh data
function apearProcess(obj) {
    let arrBtn = document.querySelectorAll(".appear-process");
    let arrProcessData = document.querySelectorAll(".data-process");
    let arrProcessIcon = document.querySelectorAll(".process-icon");

    for (let i = 0; i < arrBtn.length; i++) {
        if (arrBtn[i] == obj) {
            arrProcessData[i].classList.toggle("disappear");
            arrProcessIcon[i].classList.toggle("rotate90")
        }
    }
}

// xử lý khi chọn text-box

let currentTextBox;
let pickedTextBox;
// let myForm = document.querySelector("design-form");

function whenClickTextBox(obj) {
    // console.log("con");
    pickedTextBox = obj;
    changeDataForm(obj)
    obj.addClass = 'text-box-picked';
    console.log(obj);
}

function changeDataForm(obj) {
    document.querySelector("design-form").data = obj.data;
}

function whenClickDesignArea() {
    // console.log("cha");
    if (currentTextBox != null && currentTextBox != pickedTextBox) {
        currentTextBox.removeClass = 'text-box-picked';
    }
    currentTextBox = pickedTextBox;
    pickedTextBox = null;
    if (currentTextBox == null) {
        document.querySelector("design-form").data = JSON.stringify("");
    }
    // console.log(currentTextBox.cssText);
}

function saveTextBoxData() {
    if (currentTextBox != null) {
        currentTextBox.data = document.querySelector("design-form").dataHTML;
    }
    // console.log(document.querySelector("design-form").dataHTML);
    updatePage();
}

function deletaCurrentTextBox() {
    if (currentTextBox != null) {
        try {
            currentTextBox.parentNode.removeChild(currentTextBox);
            currentTextBox = null;
            document.querySelector("design-form").data = JSON.stringify("");
        } catch (error) { }
    }
}

// ===============xu ly page =================
let currentPage;

function createTextBox() {
    if (currentPage != null) {
        currentPage.createNewTextBox();
    }
}

function deleteCurrentPage() {
    document.querySelector("story-maked").detelePage();
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
    document.querySelector("design-form").data = JSON.stringify("");
    updatePageForm();
}

function frontPage() {
    let myStory = document.querySelector(".js-story").parentNode;

    if (Number(myStory.selected) != 0) {
        myStory.selected = Number(myStory.selected) - 1;
    }

    currentTextBox = null;
    document.querySelector("design-form").data = JSON.stringify("");
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

// khi render sang trang nho hon
let scale = 1;