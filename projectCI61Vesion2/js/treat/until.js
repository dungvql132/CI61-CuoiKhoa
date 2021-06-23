export default class Until {
    static fromPXtoNumber(px) {
        if (typeof (px) == "number") {
            return px;
        } else if (px == null) {
            return '';
        }

        if (px.substring(px.length - 2, px.length) == "px") {
            return px.substring(0, px.length - 2);
        }
        return px;
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

    static getInforFromCss(css) {
        let data = css.substring(0, css.length - 1);
        try {
            return data.split(":")[1].trim();
        } catch (error) {
            return ""
        }
    }
}