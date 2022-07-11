let colliders = [];
let mouseDownX, mouseDownY, mouseX, mouseY;
let creating = false;
let doneCreating = false;
window.addEventListener('mousedown', (e) => {
    mouseDownX = e.clientX;
    mouseDownY = e.clientY;
    creating = true;
});
window.addEventListener('mouseup', (e) => {
    doneCreating = true;
});
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
//returns colliders array
function generateColliders(playerX, playerY){
    let temp = [];
    //temp[0] = startx
    //temp[1] = starty
    //temp[2] = currentx
    //temp[3] = currenty
    while (creating){
        
    }
}
function colliderCount(){
    return colliders.length;
}