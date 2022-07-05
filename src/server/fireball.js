const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Fireball extends ObjectClass{
    constructor(parentID, x, y, dir){
        super(shortid(), x, y, dir, Constants.BULLET_SPEED);//shortid generates a network id for the object
        this.parentID = parentID;//tracks who created the bullet
    }

    update(dt){
        super.update(dt);
        return this.x < 0 || this.x > Constants.MAP_SIZE || this.y < 0 || this.y > Constants.MAP_SIZE;
    }
}
module.exports = Fireball;