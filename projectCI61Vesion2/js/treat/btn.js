
// CÁC NÚT BẤM TRONG FORM ---------------------------------------------
function appearDiv(obj){
    let btn = document.querySelectorAll(".design-place-element-label");
    let div = document.querySelectorAll(".design-place-element-input");

    let place;
    for (let index = 0; index < btn.length; index++) {
        if(btn[index] == obj){
            place = index;
            break;
        }
    }

    div[place].classList.toggle("disappear");
}

function addValue(){
    currentDiv.style.cssText = form.DataHTML.css;
    currentDiv.innerHTML = form.DataHTML.innerHTML;
}

// --------------------------------------------------------------------

// CÁC NÚT TRONG DESIGN -----------------------------------------------
let currentDiv;
let pickedDiv;
let form = document.querySelector(".js-design-form");

function cancelPicked(){
    currentDiv = pickedDiv;
    pickedDiv = null;
    if(currentDiv == null){
        form.data = "";
        form.innerhtml = "";
    }
}

function selected(obj){
    pickedDiv = obj;
    form.data = obj.style.cssText;
    form.innerhtml = obj.innerHTML;
}