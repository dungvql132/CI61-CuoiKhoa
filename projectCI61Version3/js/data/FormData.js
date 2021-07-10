export default class FormData{
    static _fonts = ["Times New Roman","Courier New","Arial","Cambria","Verdana"];
    static fonts = JSON.stringify(this._fonts);

    static _animation = ["fadeIn","fadeInDown","fadeInLeft","fadeInRight","fadeInUp","fadeInTopLeft","fadeInTopRight",
                        'fadeInBottomLeft','fadeInBottomRight',"flipInX","flipInY","lightSpeedInRight","lightSpeedInLeft",
                        "rollIn","zoomIn","slideInDown","slideInLeft","slideInRight","slideInUp"];
    static animation = JSON.stringify(this._animation);

    static _borderStyle = ["dashed","dotted","solid","double","groove","hidden","transparent"];
    static borderStyle = JSON.stringify(this._borderStyle);

    static _defaultTextBox = {
        cssText : `height: 100px;width: 100px;font-family: Arial;border-radius: 10px;border-width: 2px;
        border-style: solid;border-color: #000;padding-left: 20px; padding-top:20px;top:30px;left:30px;
        background-color: #ffffff;`,
        innerHTML : "text box",
        animation : ""
    }
    static defaultTextBox = JSON.stringify(this._defaultTextBox);

    static _kinds = ["Trinh thám", "Đời thường", "Truyện buồn"]
    static kinds = JSON.stringify(this._kinds);

    static _background = ["transparent"];
    static background = JSON.stringify(this._background);
}