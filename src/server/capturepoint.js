const AilPoint = require('./ailpoint');
const Constants = require('../shared/constants');

class CapturePoint extends AilPoint{
    constructor(radius){
        super(radius);
        super.timeLeft = Constants.CAPTURE_TIME;
        super.timeAmount = Constants.CAPTURE_TIME;
        //this.beingCaptured = false; replaced by this.active because points being active is handled naturally as they are not
        //sent to the player or updated if they are inactive
    }
    update(dt){
        if (this.active){
            this.timeLeft -= dt;
        }
    }
    serializeForUpdate(){
        //console.log(this.id, this.direction, this.hp, this.fire);
        return{
            ...(super.serializeForUpdate()),
            timeLeft: this.timeLeft,
            active: this.active,
        };
    }
}
module.exports = CapturePoint;