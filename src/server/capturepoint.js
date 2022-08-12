const AilPoint = require('./ailpoint');
const Constants = require('../shared/constants');

class CapturePoint extends AilPoint{
    constructor(radius){
        super(radius);
        this.active = false;
        this.beingCaptured = false;
        this.timeLeft = Constants.CAPTURE_TIME;
    }
    update(dt){
        
    }
    serializeForUpdate(){
        //console.log(this.id, this.direction, this.hp, this.fire);
        return{
            ...(super.serializeForUpdate()),
            timeLeft: this.timeLeft,
            beingCaptured: this.beingCaptured,
        };
    }
}
module.exports = CapturePoint;