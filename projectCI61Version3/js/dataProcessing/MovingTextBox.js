let textBox_Picked = {
    top : -1,
    left : -1
}

let mouse_Picked = {
    top : -1,
    left : -1
}

let mouse_Moved = {
    top : -1,
    left : -1
}

let textBox_Moved = {
    top : -1,
    left : -1
}

function resetAll() {
    textBox_Picked.top = -1;
    textBox_Picked.left = -1;
}

function mouseDown(move,mouseTop,mouseLeft) {
    let myMove = JSON.parse(move);
    textBox_Picked.top = Number(myMove.top);
    mouse_Picked.top = mouseTop;

    textBox_Picked.left = Number(myMove.left);
    mouse_Picked.left = mouseLeft;

    console.log(mouse_Picked);
    console.log(textBox_Picked);
}

function mouseMove(mouseTop,mouseLeft) {
    mouse_Moved.top = mouseTop;
    mouse_Moved.left = mouseLeft;

    textBox_Moved.top = textBox_Picked.top + (mouse_Moved.top - mouse_Picked.top);
    textBox_Moved.left = textBox_Picked.left + (mouse_Moved.left - mouse_Picked.left);

    return JSON.stringify(textBox_Moved);
}

function mouseRelease() {
    resetAll();
}

function isCanMove() {
    if(textBox_Picked.top == -1 && textBox_Picked.left == -1){
        return false;
    }else{
        return true;
    }
}