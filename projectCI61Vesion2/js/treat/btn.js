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
    console.log(place);

    div[place].classList.toggle("disappear");
}

let currentDiv;
let form = document.querySelector(".js-design-form");
console.log(form);

function cha(){
    console.log("cha");
}

function selected(obj){
    console.log("con");
    currentDiv = obj;
    form.data = obj.style.cssText;
    form.innerhtml = obj.innerHTML;
}

function addValue(){
    currentDiv.style.cssText = form.DataHTML.css;
    currentDiv.innerHTML = form.DataHTML.innerHTML;
    console.log(form.DataHTML);
}