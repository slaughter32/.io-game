import { getCurrentState } from './state';
const Constants = require('../shared/constants');

let colliders = [];
let debugBoxes = [];
let mouseDownX, mouseDownY, mouseX, mouseY;
let creating = false;
let doneCreating = false;

if (Constants.COLLISION_EDITOR){ //only edit colliders if you are supposed to
    window.addEventListener('mousedown', (e) => {
        mouseDownX = e.clientX;
        mouseDownY = e.clientY;
        creating = true;
    });
    window.addEventListener('mouseup', (e) => {
        doneCreating = true;
        createDebugRect(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    function createDebugRect(finalX, finalY){
        const { me, others, bullets, fire } = getCurrentState();
        let temp = []; //temporary array to hold a debugBox
        temp[0] = mouseDownX; //x-starting
        temp[1] = mouseDownY; //y-starting
        temp[2] = finalX - mouseDownX; //width
        temp[3] = finalY - mouseDownY; //height
        temp[4] = me.x; //x and y coords of player are so that the collider boxes can move with the player/not stay stagnant to the camera
        temp[5] = me.y;
        debugBoxes.push(temp);
    }
    //returns colliders array for debugging
    //this is what gives the data to draw them on the screen
    function generateColliders(playerX, playerY){
        let temp = [];
        //temp[0] = startx
        //temp[1] = starty
        //temp[2] = currentx
        //temp[3] = currenty
        // while (creating){
        
        // }
        return temp;
    }
    function colliderCount(){
        return colliders.length;
    }
}

export function getDebugBoxes(){
    if (Constants.COLLISION_EDITOR){
        return debugBoxes;
    }
    else{
        return null;
    }
}