const { ModuleFilenameHelpers } = require('webpack');
const Constants = require('../shared/constants');

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