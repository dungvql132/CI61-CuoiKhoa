export default class TextBox {
    style = "height: 100px; width: 100px; top: 100px; left: 100px; color: rgb(0, 0, 0); border-radius: 20px; border-width: 3px; border-style: solid; border-color: rgb(0, 0, 0); padding-left: 20px; padding-top: 30px; background-color: rgb(255, 255, 255); background-image: url();";
    isEditting;
    innerHTML = "text box";
    class = "absolute"
    constructor(style) {
        if (style != null) { this.style = style; }
        this.isEditting = true;
    }

    update(obj) {
        this.style = obj.style;
        this.isEditting = obj.isEditting;
    }

    get toDom() {
        let result = document.createElement("div");
        result.innerHTML = this.innerHTML;
        result.classList.add(this.class);
        result.style.cssText = this.style;
        result.addEventListener("click", (event)=>{
            selected(result);
        });
        return result;
    }
}