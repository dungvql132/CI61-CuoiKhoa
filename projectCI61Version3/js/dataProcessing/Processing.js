export default class Processing {
    constructor(){

    }
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

    static fromURLtoString(url) {
        return url.substring(5, url.length - 2);
    }

    static fromStringtoURL(string) {
        return "url(" + string + ")";
    }

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

    static fromCssObjectToCssText(cssObject) {
        let cssText = "";
        for (const key in cssObject) {
            cssText += key + ":" + cssObject[key] + ";";
        }
        return cssText;
    }

    static updateCss(cssTextOld, cssTextAdd) {
        let newCssText = cssTextOld + cssTextAdd;

        let test = document.createElement("div");
        test.style.cssText = newCssText;

        return test.style.cssText;
    }

    static processInputWrapperIn(value, givedata, keepdata) {
        console.log(givedata, keepdata);
        if (givedata == "string" && keepdata == "string") {
            return value;
        } else if (givedata == "px" && keepdata == "number") {
            return this.fromPXtoNumber(value);
        } else if (givedata == "rgb" && keepdata == "hexa") {
            console.log(this.fromRGBtoHEX(value));
            return this.fromRGBtoHEX(value);
        } else if (givedata == "url" && keepdata == "string") {
            return this.fromURLtoString(value)
        } else{
            return value;
        }
    }

    static processInputWrapperOut(value, keepdata, returndata){
        if (returndata == "string" && keepdata == "string") {
            return value;
        } else if (returndata == "px" && keepdata == "number") {
            return value + "px";
        } else if (returndata == "hexa" && keepdata == "hexa") {
            return this.fromRGBtoHEX(value);
        } else if (returndata == "url" && keepdata == "string") {
            return this.fromStringtoURL(value);
        } else{
            return value;
        }
    }
}