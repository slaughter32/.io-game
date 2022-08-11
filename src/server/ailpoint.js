//ailpoint.js is the parent object for capturepoints, healpoints, and spawn points to inherit
//this script contains the spawn logic for capture points, heal points, and spawn points
const Constants = require("../shared/constants");
const collisions = require('./collisions');

class Ailpoint{
    constructor(radius){
        this.radius = radius;
        this.x;
        this.y;
        this.generateRandomPoint();//immediately create it at a random point
    }
    generateRandomPoint(){
        while (!found){
            let max = Constants.MAP_SIZE;
            let x = Math.random() * max;
            let y = Math.random() * max;
            found = !collisions.objectBFACollision(x, y, this.radius);//true if collision, false if no collision
            if (found){
                console.log("Found Coordinates: ", x, y);
                this.x = x;
                this.y = y;
            }
        }
    }
    serializeForUpdate(){
        return{
            x: this.x,
            y: this.y,
            radius: this.radius,
        };
    }


    //Getters
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getRadius(){
        return this.radius;
    }
}
