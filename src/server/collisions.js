const { ModuleFilenameHelpers } = require('webpack');
const Constants = require('../shared/constants');

//Player Collisions:
//By default, the game makes sure the player is within the map size bounds by simply not allowing the x or y values to surpass the map size
//We also need players to collide with walls, however
//pass through 4 coordinates for a wall, effectively creating a box (createBox())???
//every update, check the players coordinates and make sure they are not attempting to pass into this box, if they are, then prevent the players movement in the direction of the box from the player
//if the player is colliding with 2 sides of the box, restrict the players movement in both directions (or perhaps even 3 in some scenarios)
//these boxes also need to be passed through to render so that they can be drawn as a series of rectangles on the client

//Player Ice Detection:
//Ice will be present in some scenarios, changing how player input works... This can be read as onIce in the player...
//Ice detection works the same as box detection, but should not restrict players movement but rather tell the player they are on ice so that their movement can become harder to control
//Ice also needs to be passed on to the client render function so that it can draw an ice-colored rectangle

//All collision points need to be generated once and sent once.


function applyCollisions(players, bullets){
    const destroyedBullets = [];
    for (let i = 0; i < bullets.length; i++){
        for (let j = 0; j < players.length; j++){
            const bullet = bullets[i];
            const player = players[j];
            if (bullet.parentID !== player.id && player.distanceTo(bullet) <= Constants.PLAYER_RADIUS + Constants.BULLET_RADIUS){
                destroyedBullets.push(bullet);
                player.takeBulletDamage();
                for (let x = 0; x < players.length; x++){
                    players[x].halfDashCooldown(bullet.parentID);
                }
                break;
            }
        }
    }
    return destroyedBullets;
}

module.exports = applyCollisions;