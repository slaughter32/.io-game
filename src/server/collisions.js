const { constant } = require('lodash');
const { ModuleFilenameHelpers } = require('webpack');
const Constants = require('../shared/constants');
const getBFA = require('./BFA');
//Player Collisions:
//By default, the game makes sure the player is within the map size bounds by simply not allowing the x or y values to surpass the map size
//We also need players to collide with walls, however
//pass through 4 coordinates for a wall, effectively creating a box (createBox())???
//every update, check the players coordinates and make sure they are not attempting to pass into this box, if they are, then prevent the players movement in the direction of the box from the player
//if the player is colliding with 2 sides of the box, restrict the players movement in both directions (or perhaps even 3 in some scenarios)
//these boxes also need to be passed through to render so that they can be drawn as a series of rectangles on the client


//All collision points need to be generated once and sent once.

let BFA = getBFA();
function applyCollisions(players, bullets){
    const destroyedBullets = [];
    for (let i = 0; i < bullets.length; i++){
        const bullet = bullets[i];
        for (let j = 0; j < players.length; j++){
            const player = players[j];
            if (bullet.parentID !== player.id && player.distanceTo(bullet) <= Constants.PLAYER_RADIUS + Constants.BULLET_RADIUS){

                //needs to pass a seperate value to show that the bullet collided with a player
                bullet.playerCollision = true;
                destroyedBullets.push(bullet); //true = player collision --half dash cooldown in game where the bullet is destroyed
                player.takeBulletDamage();
                break;
            }
        }
        //check for collisions with colliders in the map
        for (let c = 0; c < BFA.length; c++){
            //X
            if (Math.abs(bullet.x - BFA[c][2]) < Constants.BULLET_RADIUS && bullet.y < BFA[c][3] && bullet.y > BFA[c][1]) {destroyedBullets.push(bullet)};
            if (Math.abs(BFA[c][0] - bullet.x) < Constants.BULLET_RADIUS && bullet.y < BFA[c][3] && bullet.y > BFA[c][1]) {destroyedBullets.push(bullet)};
            //Y
            if (Math.abs(bullet.y - BFA[c][3]) < Constants.BULLET_RADIUS && bullet.x < BFA[c][2] && bullet.x > BFA[c][0]) {destroyedBullets.push(bullet)};
            if (Math.abs(BFA[c][1] - bullet.y) < Constants.BULLET_RADIUS && bullet.x < BFA[c][2] && bullet.x > BFA[c][0]) {destroyedBullets.push(bullet)};
        }
        
    }
    return destroyedBullets;
}

//BFA is an array of all colliders containing 4 elements for each [0]-top left x, [1]-top left y, [2]-bottom right x, [3]-bottom right y
function checkPlayerCollisions(player){
    //console.log("Checking Collisions for Player id: " + player.id);h
    //console.log(BFA.length);
    let colls = [0, 0, 0, 0]; //x to the right, x to the left, y up, y down
    for (let i = 0; i < BFA.length; i++){
        //console.log('thing happen');
        //let centX = (BFA[i][0] + BFA[i][2]) / 2;
        //let centY = (BFA[i][1] + BFA[i][3]) / 2;
        //if (Math.hypot(centX - player.x, centY - player.y) > Constants.PLAYER_RADIUS * 20){continue};
        //X
        if (Math.abs(player.x - BFA[i][2]) < Constants.PLAYER_RADIUS && player.y < BFA[i][3] + Constants.PLAYER_RADIUS && player.y > BFA[i][1] - Constants.PLAYER_RADIUS) {colls[1] = BFA[i][2] + Constants.PLAYER_RADIUS};
        if (Math.abs(BFA[i][0] - player.x) < Constants.PLAYER_RADIUS && player.y < BFA[i][3] + Constants.PLAYER_RADIUS && player.y > BFA[i][1] - Constants.PLAYER_RADIUS) {colls[0] = BFA[i][0] - Constants.PLAYER_RADIUS};
        //Y
        if (Math.abs(player.y - BFA[i][3]) < Constants.PLAYER_RADIUS && player.x < BFA[i][2] + Constants.PLAYER_RADIUS && player.x > BFA[i][0] - Constants.PLAYER_RADIUS) {colls[2] = BFA[i][3] + Constants.PLAYER_RADIUS};
        if (Math.abs(BFA[i][1] - player.y) < Constants.PLAYER_RADIUS && player.x < BFA[i][2] + Constants.PLAYER_RADIUS && player.x > BFA[i][0] - Constants.PLAYER_RADIUS) {colls[3] = BFA[i][1] - Constants.PLAYER_RADIUS};

        //Distance if else--irrelevant
        //return (Math.sqrt(Math.pow((player.x - centX), 2) + Math.pow((player.y - centY), 2)));
    }
    return colls;
}
exports.applyCollisions = applyCollisions;
exports.checkPlayerCollisions = checkPlayerCollisions;
// module.exports = applyCollisions;
// module.exports = checkPlayerCollisions;