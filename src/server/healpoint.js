const AilPoint = require('./ailpoint');
const Constants = require('../shared/constants');

class HealPoint extends AilPoint{
    constructor(radius){
        super(radius);
        this.active = false;
        this.beingTaken = false;
        this.timeLeft = Constants.HEAL_POINT_TIME;
    }
    update(dt){
        
    }
    serializeForUpdate(){
        //console.log(this.id, this.direction, this.hp, this.fire);
        return{
            ...(super.serializeForUpdate()),
            timeLeft: this.timeLeft,
            beingCaptured: this.beingTaken,
        };
    }
}
module.exports = HealPoint;