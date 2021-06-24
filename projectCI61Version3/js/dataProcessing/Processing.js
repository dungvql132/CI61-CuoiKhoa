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
        return url.substring(5, url.length - 2);
    }

    // chuyển giá trị string về url: ví dụ http:google -> url("http:google")
    static fromStringtoURL(string) {
        return "url(" + string + ")";
    }

    // chuyển 1 chuỗi cssText về object: ví dụ "height:100px; width:100px;" ->
    // {
    //     height : "100px",
    //     width : "100px"
    // }
    static formCssTextToCssObject(cssText) {
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
                cssObject[variable[0].trim()] += variable[i].trim();
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

    // xử lý giá trị đầu VÀO cho input-wrapper và input-dropdown
    static processInputWrapperIn(value, givedata, keepdata) {
        if (givedata == "string" && keepdata == "string") {
            return value;
        } else if (givedata == "px" && keepdata == "number") {
            return this.fromPXtoNumber(value);
        } else if (givedata == "rgb" && keepdata == "hexa") {
            console.log(this.fromRGBtoHEX(value));
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
}