
export default class StyleMyBox {
    constructor() {
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

    static getInforFromCss(css){
        let data = css.substring(0,css.length-1);
        try {
            return data.split(":")[1].trim();
        } catch (error) {
            return ""
        }
    }
}

