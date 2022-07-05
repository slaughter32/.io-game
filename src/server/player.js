const ObjectClass = require('./object');
const Fireball = require('./fireball');
const Constants = require('../shared/constants');

class Player extends ObjectClass{
    constructor(id, username, x, y, triedToShoot, mDir){
        super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
        this.username = username;
        this.hp = Constants.PLAYER_MAX_HP;
        this.fireCooldown = 0;
        this.score = 0;
        this.triedToShoot = false;
    }

    update(dt){
        super.update(dt);

        this.score += dt * Constants.SCORE_PER_SECOND;
        
        //sends player location to server to deal with collisions etc
        this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
        this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

        this.fireCooldown -= dt;
        if (this.fireCooldown <= 0 && this.triedToShoot){
            //need to establish bullets to have their own velocity plus the player velocity
            //need to start a countdown timer that communicates with render.js to display the shooting cooldown correctly
            //this is a test
            this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
            this.triedToShoot = false;
            return new Fireball(this.id, this.x, this.y, this.mDir);
        }
        return null;
    }
    takeBulletDamage(){
        this.hp -= Constants.BULLET_DAMAGE;
    }
    shoot(mouseDir){
        //console.log('player-shoot');
        this.mDir = mouseDir;
        this.triedToShoot = true;
    }
    onDealtDamage(){
        this.score += Constants.SCORE_BULLET_HIT;
    }
    setSpeed(speed){
        this.speed = speed;
    }
    serializeForUpdate(){
        return{
            ...(super.serializeForUpdate()),
            direction: this.direction,
            hp: this.hp,
        };
    }
}
module.exports = Player;