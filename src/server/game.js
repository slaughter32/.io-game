const Constants = require('../shared/constants');
const Player = require('./player');
const CapturePoint = require('./capturepoint');
const HealPoint = require('./healpoint');
const collisions = require('./collisions');
const { kebabCase } = require('lodash');


class Game{
    constructor(){
        this.sockets = {};
        this.players = {};
        this.bullets = [];
        this.capturepoints = [];
        this.healpoints = [];
        this.activeCapturePoints = [];
        this.activeHealPoints = [];
        this.serverProfitSinceCap = 0;
        this.timeSinceLastCap = 0;
        this.lastActiveCP = 0;
        this.timeTillHP = Constants.HEAL_POINT_RESPAWN_TIME;
        this.lastUpdateTime = Date.now();
        this.shouldSendUpdate = false;
        this.createAilPoints();
        setInterval(this.update.bind(this), 1000 / 60);//1000ms in second, /60 for 60 updates/second
    }
    //create ail points at the start
    createAilPoints(){
      //Create Capture Points
      for (let i = 0; i < Constants.CAPTURE_POINT_QUANTITY; i++){
        this.capturepoints.push(new CapturePoint(Constants.CP_CAPTURE_RADIUS));
      }
      //initialize first capturepoint
      this.activeCapturePoints.push(this.capturepoints[0]);
      this.lastActiveCP = 0;
      console.log("First Capture Point Location: ", this.capturepoints[0].x, this.capturepoints[0].y);
      //Create Heal Points
      for (let i = 0; i < Constants.HEAL_POINT_QUANTITY; i++){
        this.healpoints.push(new HealPoint(Constants.HEAL_POINT_RADIUS));
      }
    }

    addPlayer(socket, username){
        this.sockets[socket.id] = socket;

        //generate position to start the player at
        const x = Constants.MAP_SIZE / 2;
        const y = Constants.MAP_SIZE / 2;
        this.players[socket.id] = new Player(socket.id, username, x, y);
    }

    removePlayer(socket){
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }

    handleInput(socket, dir){
        if (this.players[socket.id]){
            this.players[socket.id].setDirection(dir);
        }
    }
    shoot(socket, mouseDir){
      if (this.players[socket.id]){
        this.players[socket.id].shoot(mouseDir);
      }
    }
    dash(socket, mouseDir){
      if (this.players[socket.id]){
        this.players[socket.id].dash(mouseDir, collisions.checkDashCollisions(this.players[socket.id], mouseDir));
      }
    }
    handleSpeed(socket, speed){
      if (this.players[socket.id]){
        this.players[socket.id].setSpeed(speed);
      }
    }

    update(){
        //calculate time elapsed
        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;

        this.timeSinceLastCap += dt;
        this.timeTillHP -= dt;
        //set active capture and heal points
        if (this.timeSinceLastCap >= Constants.CAPTURE_POINT_REQUIRED_TIME && this.serverProfitSinceCap >= Constants.CAPTURE_POINT_REQUIRED_GOLD && this.activeCapturePoints.length <= 0){
          if (this.lastActiveCP < this.activeCapturePoints.length){
            this.lastActiveCP++;
          }else{
            this.lastActiveCP = 0;
          }
          this.activeCapturePoints.push(this.capturepoints[this.lastActiveCP]);
        }

        if (this.activeHealPoints.length < Constants.MAX_HEAL_POINTS && this.timeTillHP <= 0){
          this.timeTillHP = Constants.HEAL_POINT_RESPAWN_TIME;
          this.activeHealPoints.push(this.healpoints.pop());
        }

        //check the status of active healpoints/capturepoints
        for (let i = 0; i < this.activeCapturePoints.length; i++){
          //console.log(this.activeCapturePoints[i].timeLeft);
          const activePoint = this.activeCapturePoints[i];
          activePoint.collision(Object.values(this.players));
          activePoint.update(dt);
          //console.log(activePoint);
          if (activePoint.timeLeft <= 0){
            activePoint.currentPlayer.score += Constants.CAPTURE_POINT_BONUS_GOLD;
            this.activeCapturePoints.pop();
            this.serverProfitSinceCap = 0;
          }
          
        }
        for (let i = 0; i < this.activeHealPoints.length; i++){
          const activePoint = this.activeHealPoints[i];
          activePoint.collision(Object.values(this.players));
          activePoint.update(dt);
          //console.log(activePoint);
          if (activePoint.timeLeft <= 0){
            activePoint.currentPlayer.hp += Constants.HEAL_POINT_AMOUNT;
            this.activeHealPoints[i].pop();
          }
        }


        //update each bullet
        const bulletsToRemove = [];
        this.bullets.forEach(bullet => {
            if (bullet.update(dt)){
                //destroy
                bulletsToRemove.push(bullet);
            }
        });
        this.bullets = this.bullets.filter(bullet => !bulletsToRemove.includes(bullet));

        //update each player
        Object.keys(this.sockets).forEach(playerID => {
            const player = this.players[playerID];
            player.checkCollisions(collisions.checkPlayerCollisions(player));
            const newBullet = player.update(dt);
            if (newBullet){
                this.bullets.push(newBullet);
            }
        });

        //Apply collisions for each player to game colliders
        // for (let i = 0; i < this.players.length; i++){
        //   player.checkCollisions(checkPlayerCollisions(player));
        // }
        
        //Apply collisions, give players score for bullets that hit
        let destroyedBullets = collisions.applyCollisions(Object.values(this.players), this.bullets);
        destroyedBullets.forEach(b => {
          if (this.players[b.parentID] && b.playerCollision == true) {
            this.players[b.parentID].halfDashCooldown();
            const hitID = b.hitID;
            if (hitID.hp <= 0){
              let gold = Constants.GOLD_ON_KILL;
              this.players[b.parentID].onKill(gold);
              hitID.onDeath();
            }

          }
        });
        this.bullets = this.bullets.filter(bullet => !destroyedBullets.includes(bullet));
    
        // Check if any players are dead and apply player collisions
        Object.keys(this.sockets).forEach(playerID => {
          const socket = this.sockets[playerID];
          const player = this.players[playerID];
          if (player.hp <= 0) {
            socket.emit(Constants.MSG_TYPES.GAME_OVER);
            this.removePlayer(socket);
          }
        });
        // Object.keys(this.players).forEach(playerID => {
        //   const player = this.players[playerID];
        //   player.checkCollisions(collisions.checkPlayerCollisions(player));
        // });
    
        // Send a game update to each player every other time
        if (this.shouldSendUpdate) {
          const leaderboard = this.getLeaderboard();
          Object.keys(this.sockets).forEach(playerID => {
            const socket = this.sockets[playerID];
            const player = this.players[playerID];
            socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
          });
          this.shouldSendUpdate = false;
        } else {
          this.shouldSendUpdate = true;
        }
      }
    
      getLeaderboard() {
        return Object.values(this.players)
          .sort((p1, p2) => p2.score - p1.score)
          .slice(0, 5)
          .map(p => ({ username: p.username, score: Math.round(p.score) }));
      }
    
      createUpdate(player, leaderboard) {
        const nearbyPlayers = Object.values(this.players).filter(
          p => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2,
        );
        const nearbyBullets = this.bullets.filter(
          b => b.distanceTo(player) <= Constants.MAP_SIZE / 2,
        );
        //console.log(nearbyPlayers.map(p => p.serializeForUpdate()));
        return {
          t: Date.now(),
          me: player.serializeForUpdate(),
          others: nearbyPlayers.map(p => p.serializeForUpdate()),
          bullets: nearbyBullets.map(b => b.serializeForUpdate()),
          capturepoints: this.activeCapturePoints,
          healpoints: this.activeHealPoints,
          leaderboard,
        };
    }
}

module.exports = Game;