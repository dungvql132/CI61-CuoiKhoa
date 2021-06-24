
// hiển thị ra phần điều chỉnh data
function apearProcess(obj){
    let arrBtn = document.querySelectorAll(".appear-process");
    let arrProcessData = document.querySelectorAll(".data-process");

    for(let i = 0; i<arrBtn.length; i++){
        if(arrBtn[i] == obj){
            arrProcessData[i].classList.toggle("disappear");
            return;
        }
    }
}