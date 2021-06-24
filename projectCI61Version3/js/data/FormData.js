
export default class FormData{
    static _fonts = ["Times New Roman","Courier New","Arial","Cambria","Verdana"];
    static fonts = JSON.stringify(this._fonts);

    static _animation = ["dropdown","jump"];
    static animation = JSON.stringify(this._animation);

    static _borderStyle = ["dashed","dotted","solid","double","groove"];
    static borderStyle = JSON.stringify(this._borderStyle);

    static _defaultTextBox = {
        cssText : `height: 100px;width: 100px;font-family: Arial;border-radius: 10px;border-width: 2px;
        border-style: solid;border-color: #000;padding-left: 20px; padding-top:20px;top:30px;left:30px;
        background-color: #ffffff;`,
        innerHTML : "text box",
        animation : ""
    }
    static defaultTextBox = JSON.stringify(this._defaultTextBox);
}