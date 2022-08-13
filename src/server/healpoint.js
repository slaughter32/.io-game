const AilPoint = require('./ailpoint');
const Constants = require('../shared/constants');

class HealPoint extends AilPoint{
    constructor(radius){
        super(radius);
        super.timeLeft = Constants.HEAL_POINT_TIME;
        super.timeAmount = Constants.HEAL_POINT_TIME;
    }
    update(dt){
        if (super.active){
            super.timeLeft -= dt;
        }
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