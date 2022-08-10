const ObjectClass = require('./object');
const Fireball = require('./fireball');
const Constants = require('../shared/constants');
//const collisions = require('./collisions');

class Player extends ObjectClass{
    constructor(id, username, x, y, mDir, fire){
        super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
        this.username = username;
        this.hp = Constants.PLAYER_MAX_HP;
        this.fireCooldown = 0;
        this.score = 0;
        this.triedToShoot = false;
        this.triedToDash = false;
        this.dashX;
        this.dashY;

        this.dashCooldown = 0;
        this.dashRatio = this.dashCooldown / Constants.PLAYER_DASH_COOLDOWN;
        this.fire = this.fireCooldown / Constants.PLAYER_FIRE_COOLDOWN;
        this.canMove = [true, true, true, true]; // x right, x left, y up, y down
    }

    update(dt){
        super.update(dt);

        //console.log(`player coords: ${this.x}, ${this.y}`);

        this.score += dt * Constants.SCORE_PER_SECOND;
        
        //updates location and makes sure the player is within bounds of the map size
        //Run collision detection to see if the player can move in a given direction
        //console.log(`canMove: ${this.canMove}`);
        //canmove[0]->[3]:: x right, x left, y up, y down
        //this.x += dt * this.speed * Math.sin(this.direction); // > 0 or < 0
        //this.y -= dt * this.speed * Math.cos(this.direction); // > 0 or < 0
        //ideally the player should only try to move in a given direction if it can
        //this.canMove = collisions.checkPlayerCollisions(this);
        if (this.canMove[0] != 0 || this.canMove[1] != 0){
            if (this.canMove[0] != 0){//restrict right
                if (Math.sin(this.direction) < 0){
                    this.x += dt * this.speed * Math.sin(this.direction);
                }
            }else{//restrict left
                if (Math.sin(this.direction) > 0){
                    this.x += dt * this.speed * Math.sin(this.direction);
                }
            }
        }else{
            this.x += dt * this.speed * Math.sin(this.direction);
        }
        if (this.canMove[2] != 0 || this.canMove[3] != 0){
            if (this.canMove[2] != 0){//restrict up
                if (Math.cos(this.direction) < 0){
                    this.y -= dt * this.speed * Math.cos(this.direction);
                }
            }else{//restrict down
                if (Math.cos(this.direction) > 0){
                    this.y -= dt * this.speed * Math.cos(this.direction);
                }
            }
        }else{
            this.y -= dt * this.speed * Math.cos(this.direction);
        }
        
        //prevents player from moving below 0 or beyond MAP_SIZE
        this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
        this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));
        
        //need to send this.fireCooldown / Constants.PLAYER_FIRE_COOLDOWN to the client

        this.fireCooldown -= dt;
        //I need to half the current dash cooldown if a player hits another with a fireball
        this.dashCooldown -= dt;
        this.fire = this.fireCooldown / Constants.PLAYER_FIRE_COOLDOWN;
        this.dashRatio = this.dashCooldown / Constants.PLAYER_DASH_COOLDOWN;
        //console.log(`fire(player): ${this.fire}`);
        if (this.fireCooldown <= 0 && this.triedToShoot){
            //need to establish bullets to have their own velocity plus the player velocity
            //need to start a countdown timer that communicates with render.js to display the shooting cooldown correctly
            //this is a test
            this.fireCooldown = Constants.PLAYER_FIRE_COOLDOWN;
            this.triedToShoot = false;
            return new Fireball(this.id, this.x, this.y, this.mDir);
        }
        if (this.dashCooldown <= 0 && this.triedToDash){

            this.dashCooldown = Constants.PLAYER_DASH_COOLDOWN;
            this.triedToDash = false;
            this.x = this.dashX;
            this.y = this.dashY;
            //add some distance to the x and y coordinates of the parent component(super.x, super.y)
            //console.log(`player x: ${this.getX()} y: ${this.getY()}\nmouse x: ${this.mouseX} y: ${this.mouseY}`);
            //let d = Math.sqrt((this.getX() - this.))
            //console.log(`${this.username} Dashed.\nid: ${this.id}\ncoords: ${this.x}, ${this.y}`);
            // this.x += Constants.PLAYER_DASH_DISTANCE * Math.sin(this.mDir);
            // this.y -= Constants.PLAYER_DASH_DISTANCE * Math.cos(this.mDir);
            //console.log(`\n${this.id} post dash coords\n${this.x}, ${this.y}`);
            //dash?
        }
        this.triedToDash = false;
        this.triedToShoot = false;
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
    dash(mouseDir, coord){
        //console.log("In player", coord[0], coord[1]);
        this.mDir = mouseDir;
        this.dashX = coord[0];//x
        this.dashY = coord[1];//y
        this.triedToDash = true;
    }
    halfDashCooldown(){
        this.dashCooldown = this.dashCooldown / 2;
    }
    checkCollisions(colls){
        //console.log("checking player collisions: " + this.id);
        this.canMove = colls;
    }
    onDealtDamage(){
        this.score += Constants.SCORE_BULLET_HIT;
    }
    setSpeed(speed){
        this.speed = speed;
    }
    serializeForUpdate(){
        //console.log(this.id, this.direction, this.hp, this.fire);
        return{
            ...(super.serializeForUpdate()),
            direction: this.direction,
            hp: this.hp,
            fire: this.fire,
            dash: this.dashRatio,
        };
    }
}
module.exports = Player;