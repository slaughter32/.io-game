import { generate } from 'shortid';
import { getCurrentState } from './state';
const Constants = require('../shared/constants');


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
        //console.log(`MouseCanvasPos: ${e.clientX - (window.innerWidth / 2)}, ${e.clientY - (window.innerHeight / 2)}`);
    });
    window.addEventListener('keydown', (e) => {
        if (e.key == 'l'){//collider debug
            let colls = generateColliders();
            console.log(colls);
            console.log(`Colliders as a string:\nMap Size: ${Constants.MAP_SIZE}\n${colls}`);
        }
        if (e.key == 'p'){//player coords
            const {me} = getCurrentState();
            console.log(me.x, me.y);
        }
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
    //returns the points of the actual colliders (all four corners of each collision box)
    //uses debugBoxes to get the points, when editing colliders you should be able to see all of these
    function generateColliders(playerX, playerY){
        let colliders = [];
        for (let i = 0; i < debugBoxes.length; i++){
            let coordSet = [];//each temp contains 2 coordinates, and 4 elements.. 
                          //temp[0] = top left x, temp[1] = top left y, temp[2] = bottom right x, temp[3] = bottom right y
            for (let o = 0; o < 4; o++){
                //For the X coordinates
                if (debugBoxes[i][2] < 0){//if drawn backwards
                    //top left x = playerx + (mouseDownX - windowWidth + width)--width is negative in this case so its actually subtracting it
                    coordSet[0] = debugBoxes[i][4] + (debugBoxes[i][0] - (window.innerWidth / 2) + debugBoxes[i][2]);
                    coordSet[2] = debugBoxes[i][4] + (debugBoxes[i][0] - (window.innerWidth / 2));
                }else{
                    coordSet[0] = debugBoxes[i][4] + (debugBoxes[i][0] - (window.innerWidth / 2));
                    coordSet[2] = debugBoxes[i][4] + (debugBoxes[i][0] - (window.innerWidth / 2) + debugBoxes[i][2]);
                }
                //For the Y coordinates
                console.log("Height: " + debugBoxes[i][3]);
                console.log("window inner height / 2: " + window.innerHeight / 2);
                if (debugBoxes[i][3] < 0){//if drawn up
                    //top left y = playerY + (mousedownY - windowHeight + height)--height is negative in this case so its actually subtracting it
                    coordSet[1] = debugBoxes[i][5] + (debugBoxes[i][1] - (window.innerHeight / 2) + debugBoxes[i][3])
                    coordSet[3] = debugBoxes[i][5] + (debugBoxes[i][1] - (window.innerHeight / 2));
                }
                else{
                    coordSet[1] = debugBoxes[i][5] + (debugBoxes[i][1] - (window.innerHeight / 2))
                    coordSet[3] = debugBoxes[i][5] + (debugBoxes[i][1] - (window.innerHeight / 2) + debugBoxes[i][3]);
                }  
            }
            colliders.push(coordSet); //add a set of coordinates to the array of coordinate sets
        }
        return (colliders); //return the array containing all the arrays of coordinates
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