export default class Processing {
    constructor() {

    }
    // chuyển giá trị px về number: ví dụ 100px -> 100, 100 -> 100
    static fromPXtoNumber(px) {
        if (typeof (px) == "number") {
            return px;
        } else if (px == null) {
            return '';
        } else if (px.substring(px.length - 2, px.length) == "px") {
            return px.substring(0, px.length - 2);
        } else {
            return px;
        }
    }

    // chuyển giá trị rgb về hexa: ví dụ rgb(10,20,30) -> #0A131E
    static fromRGBtoHEX(rgb) {
        if (typeof (rgb) == "string") {
            if (rgb.charAt(0) == '#') {
                return rgb;
            } else {
                let numbers = rgb.substring(4, rgb.length - 1).split(",");
                let number = '', result = '#';
                numbers.forEach((value) => {
                    number = (Number(value)).toString(16);
                    if (number.length == 1) {
                        number = "0" + number;
                    }
                    result += number;
                })
                return result;
            }
        } else {
            return '';
        }
    }

    // chuyển giá trị url về string: ví dụ url("http:google") -> http:google
    static fromURLtoString(url) {
        // console.log(url.substring(5, url.length - 2));
        return url.substring(5, url.length - 2);
    }

    // chuyển giá trị string về url: ví dụ http:google -> url("http:google")
    static fromStringtoURL(string) {
        return "url(\"" + string + "\")";
    }

    // chuyển 1 chuỗi cssText về object: ví dụ "height:100px; width:100px;" ->
    // {
    //     height : "100px",
    //     width : "100px"
    // }
    static formCssTextToCssObject(cssText) {
        if(cssText == null){    return {};    }
        
        let cssObject = {};
        let variable;

        let listOfStyle = cssText.substring(0, cssText.length - 1).split(";");
        if (listOfStyle == 0) {
            return cssObject;
        }
        listOfStyle.forEach((value) => {
            variable = value.split(":");
            cssObject[variable[0].trim()] = variable[1].trim();
            for (let i = 2; i < variable.length; i++) {
                cssObject[variable[0].trim()] += ":"+ variable[i].trim();
            }
        })
        return cssObject;
    }

    // chuyển từ object sang dạng cssText
    static fromCssObjectToCssText(cssObject) {
        let cssText = "";
        for (const key in cssObject) {
            cssText += key + ":" + cssObject[key] + ";";
        }
        return cssText;
    }

    // cộng 2 chuỗi cssText lại với nhau
    static updateCss(cssTextOld, cssTextAdd) {
        let newCssText = cssTextOld + cssTextAdd;

        let test = document.createElement("div");
        test.style.cssText = newCssText;

        return test.style.cssText;
    }

    // ================== INPUT WRAPPER =========================
    // xử lý giá trị đầu VÀO cho input-wrapper và input-dropdown
    static processInputWrapperIn(value, givedata, keepdata) {
        if(value == "" || value == null){
            return "";
        }

        if (givedata == "string" && keepdata == "string") {
            return value;
        } else if (givedata == "px" && keepdata == "number") {
            return this.fromPXtoNumber(value);
        } else if (givedata == "rgb" && keepdata == "hexa") {
            return this.fromRGBtoHEX(value);
        } else if (givedata == "url" && keepdata == "string") {
            return this.fromURLtoString(value)
        } else {
            return value;
        }
    }

    // xử lý giá trị đầu RA cho input-wrapper và input-dropdown
    static processInputWrapperOut(value, givedata, keepdata) {
        if (givedata == "string" && keepdata == "string") {
            return value;
        } else if (givedata == "px" && keepdata == "number") {
            return value + "px";
        } else if (givedata == "rgb" && keepdata == "hexa") {
            return this.fromRGBtoHEX(value);
        } else if (givedata == "url" && keepdata == "string") {
            return this.fromStringtoURL(value);
        } else {
            return value;
        }
    }

    // ======================= DROP DOWN =========================
    // Chuyển data của input dropdown: ví dụ
    // ["dung","dep","zai"] -> [<option>dung</option>, <option>dep</option>, <option>zai</option>]
    static processInputDropdownIn(arr) {
        let myArr = JSON.parse(arr);
        let result = [];

        if (myArr == null) {
            return result;
        }

        for (let i = 0; i < myArr.length; i++) {
            result.push(document.createElement("option"));
            result[i].text = myArr[i];
        }
        return result;
    }

    // ============  DESIGN FORM ==================
    // Chuyển từ giá trị các thẻ input-wrapper thành style
    static processDesignFormCssOut(inputs){
        let result = '';
        inputs.forEach((element) => {
            result += element.dataHTML;
        })
        return result;
    }

    // ===========TEXT BOX ==========================

    // Thêm hàm di chuyển cho Text Box
    static addEventTextBox(obj){
        obj.addEventListener("mousedown", (event) => {
            whenClickTextBox(obj)
            mouseDown(obj.position, event.screenY, event.screenX);
            Processing.preventMoveOut(obj.position, obj.$div.style.cssText, obj.parentNode.clientHeight, obj.parentNode.clientWidth)
        })

        obj.addEventListener("mouseup", () => {
            mouseRelease();
        })
    }

    // lấy về vị trí của text box từ cssText
    static getPositionFromCssText(cssText){
        let cssObj = this.formCssTextToCssObject(cssText);
        let position = {
            top : "",
            left : ""
        }

        if(cssObj.top == null){
            position.top = 0
        }else{
            position.top = this.fromPXtoNumber(cssObj.top)
        }

        if(cssObj.left == null){
            position.left = 0
        }else{
            position.left = this.fromPXtoNumber(cssObj.left)
        }
        return JSON.stringify(position);
    }

    // lấy ra size từ cssText
    // trả về dạng {height:100,width:100}
    static getSizeFromCssText(cssText){
        let cssObj = this.formCssTextToCssObject(cssText);
        let size = {
            height : "",
            width : ""
        }

        if(cssObj.height == null){
            size.height = 0
        }else{
            size.height = this.fromPXtoNumber(cssObj.height)
        }

        if(cssObj.width == null){
            size.width = 0
        }else{
            size.width = this.fromPXtoNumber(cssObj.width)
        }
        return JSON.stringify(size);
    }

    // chuyển từ position sang dạng css
    // {
    //     top: 100,
    //     left: 100
    // }
    // thành "top:100px;left:100px;"
    static getPositionCss(position){
        let myposition = JSON.parse(position);
        let cssPosition = ""
        for (const key in myposition) {
            cssPosition += key + ":" + myposition[key] + "px;";
        }
        return cssPosition;
    }

    // ngăn chặn di thẻ div ra bên ngoài: đầu vào (position: lấy vị trí đích đến, cssText: lấy size, limit: giới hạn của khung cha)
    static preventMoveOut(position,cssText, limitTop, limitLeft){
        // console.log(limitTop,limitLeft);
        let myPosition = JSON.parse(position)
        let size = JSON.parse(this.getSizeFromCssText(cssText))
        if(Number(myPosition.top) <= 0 || Number(myPosition.left <= 0)){
            // console.log("nho hon 0");
            return false;
        }else if ((Number(myPosition.top) + Number(size.height) >= limitTop)){
            // console.log("vuot rao phai");
            return false;
        }else if ((Number(myPosition.left) + Number(size.width) >= limitLeft)){
            // console.log("vuot rao trai");
            return false;
        }else{
            return true;
        }
    }

    // ====================== PAGE ====================================
    // tạo ra 1 thẻ text box mới cho page
    static createTextBox(obj,data,work){
        // console.log(obj);
        let newTextBox = document.createElement("text-box");
        obj.appendChild(newTextBox);
        newTextBox.data = data;
        newTextBox.work = work;
    }

    // event để kéo text box di chuyển
    static addEventPage(obj){
        // console.log(obj);
        obj.addEventListener("mousemove", (event) => {
            // console.log("move");
            if (currentTextBox != null && isCanMove()) {
                let checkLimit = Processing.preventMoveOut(mouseMove(event.screenY, event.screenX), currentTextBox.cssText, obj.clientHeight, obj.clientWidth);
                // console.log(checkLimit);
                if ( checkLimit) {
                    changeDataForm(currentTextBox)
                    currentTextBox.position = mouseMove(event.screenY, event.screenX);
                }
            }
        })
        
        obj.addEventListener("mouseleave", () => {
            // console.log("thoat");
            mouseRelease();
        })
    }

    // ======================= STORY =================================
    // tao ra 1 the page moi cho cho story
    static createPage(obj,data,work){
        let newPage = document.createElement("story-page");
        obj.appendChild(newPage);
        newPage.data = data;
        newPage.work = work;
    }

    static async saveStoryToFireBase(dataStory){
        // console.log(dataStory);
        await firebase.firestore().collection("storys").doc(dataStory.id).update(dataStory);
    }

    static getToDay(){
        let myDay = new Date();
        return myDay.getDate() + "/" + (myDay.getMonth() + 1) + "/" + (myDay.getFullYear());
    }
}

async function getDocs(name){
    let reponse = await firebase.firestore().collection(name).get();
    return reponse.docs;
}

export function getDataFromDoc(doc){
    let myObj = doc.data();
    console.log(myObj.id);
    myObj.id = doc.id;
    return myObj;
}

export async function getUserAction(){
    let docs = await getDocs("usersAction")
    let uid = firebase.auth().currentUser.uid;
    // console.log(firebase.auth().currentUser.uid);
    // console.log(docs);
    let result;
    try {
        docs.forEach(doc => {
            if(doc.data().idUser == uid){
                result = getDataFromDoc(doc);
                back
            }
        })
    } catch (error) {
        
    }
    // console.log(result);
    return result;
}