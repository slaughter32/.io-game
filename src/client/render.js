//this file is relatively temporary as lots needs to change... Started off a baseline .io project example.

import { constant, kebabCase } from 'lodash';
import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';
import { getDebugBoxes } from './colliderGenerator';

const Constants = require('../shared/constants');

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
const scale = 1.5;
setCanvasDimensions();

function setCanvasDimensions() {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}
let animationFrameRequestId;
function render() {
  const { me, others, bullets, capturepoints, healpoints, message } = getCurrentState();
  if (me) {//only does this for the local player, not other clients
    //Rendering Order: Background, Map Points, Bullets, Players, UI, 
    //draw big black square in the abyss
    context.fillStyle = 'black';
    context.fillRect(-600, -600, 7600, 7600);
    // Draw background
    renderBackground(me.x, me.y);

    // Draw boundaries
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

    //Draw Capture and Heal points
    renderCapAndHealPoints(capturepoints, healpoints, me, me);

    //server global message
    let fontString = `${canvas.width / 50}px Comic Sans MS`;
    context.font = fontString;
    context.fillStyle = "white";
    context.textAlign = "left";
    context.fillText(message, (231 * scale) + 10, 30);
    context.stroke();

    // Draw all bullets
    bullets.forEach(renderBullet.bind(null, me));

    // Draw all players
    renderPlayer(me, me);
    others.forEach(renderPlayer.bind(null, me));


    //Draw Debug Boxes if editing collision
    if (Constants.COLLISION_EDITOR){
      for (let i = 0; i < getDebugBoxes().length; i++){
        let temp = getDebugBoxes();
        //offset from original(so that the collider boxes move with the screen)
        
        let offsetX = temp[i][4] - me.x;
        let offsetY = temp[i][5] - me.y;
        let x = temp[i][0] + offsetX + (window.innerWidth / 2);
        let y = temp[i][1] + offsetY + (window.innerHeight / 2);
        let width = temp[i][2];
        let height = temp[i][3];
        context.strokeStyle = "green";
        context.strokeRect(x, y, width, height);
        context.restore();
      }
    }
  }

  // Rerun this render function on the next frame
  animationFrameRequestId = requestAnimationFrame(render);
}

function renderBackground(x, y) {
  //const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  //const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  context.save();
  context.rotate(0);
  context.translate(-x, -y);
  context.drawImage(
    getAsset('mainmapio.png'),
    canvas.width / 2,
    canvas.height / 2,
    MAP_SIZE,
    MAP_SIZE,
  );
  context.restore();
  
  // const backgroundGradient = context.createRadialGradient(
  //   backgroundX,
  //   backgroundY,
  //   MAP_SIZE / 10,
  //   backgroundX,
  //   backgroundY,
  //   MAP_SIZE / 2,
  // );
  //backgroundGradient.addColorStop(0, 'black');
  //backgroundGradient.addColorStop(1, 'gray');
  //context.fillStyle = backgroundGradient;
  //context.fillRect(0, 0, canvas.width, canvas.height);
}

// Renders a player at the given coordinates
function renderPlayer(me, player) {
  const { x, y, direction, fire, dash } = player;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  // Draw ship
  context.save();
  context.translate(canvasX, canvasY);
  //later I will need to change which image is being rendered for the player based on:
  //rotation, previous rendition(for walk animations etc so that it cycles)
  context.rotate(0);
  let widthBuffer = 8;
  let heightBuffer = 24;
  let width = 56;//50
  let height = 72;//66
  let image = 'magespritesheetfinal.png';
  //ANIMATION LOGIC::: 8 frames of each horizontally scrolling
  //8 columns, 1 for each of the eight directions
  //1S, 2SE, 3E, 4NE, 5N, 6,NW, 7W, 8SW
  let animState;//for columns
  if (player.direction == 0){
    animState = 5;//idle is the same as north rn....
  }
  if (player.direction > 0){
    if (player.direction < 1.5){
      animState = 4;
    }else if (player.direction < 2){
      animState = 3;
    }else if (player.direction < 3){
      animState = 2;
    }else{
      animState = 1;
    }
  }else if(player.direction < 0){
    if (player.direction < -2){
      animState = 8;
    }else if(player.direction < -1.5){
      animState = 7;
    }else{
      animState = 6;
    }
  }
  //console.log('frame: ', player.frame);
  let frame;
  if (!player.idle){
    frame = Math.round(player.frame);//for rows... 
  }else{//idle
    frame = 1;
    animState = 1;
  }
  let dumbSpriteSheet = 4;
  let yBias = 0;//x and y bias affect where the player is centered on the canvas when drawn
  let xBias = 0;
  //Player Animations differ from running when: player is recalling, player died
  if (player.recalling == 1){//player is recalling
    //recall stuff: player head starts 56 pixels from the top, 0px from the left
    //width of 78
    //height of 142
    image = 'WizardExtract.png';
    width = 78;
    height = 142;
    widthBuffer = 0;
    heightBuffer = 0;
    animState = 1;
    dumbSpriteSheet = 0;
  }
  //context.strokeRect(-30, -30, 60, 60);
  context.drawImage(
    //instead of drawing one image, I will need to draw an image based on both the previous image as well as the direction the player is moving...
    getAsset(image),
    dumbSpriteSheet + (widthBuffer * (frame - 1)) + (width * (frame - 1)),
    (heightBuffer * animState) + (height * (animState - 1)),
    width,
    height,
    -(width / 2) + xBias,
    -(height / 2) + yBias,
    width,
    height,
  );
  context.restore();




 //draws players local healthbar in the top left and draws other players health bars underneath them
 if (me == player){
  let image = '';
  let offset = 3;
  //dashCooldown
  if (dash <= 0){
    context.fillStyle = 'aqua';
    context.fillRect(
      offset + 80 * scale,
      offset + 23 * scale,
      185,
      10 * scale,
    );
  }else{
    context.fillStyle = 'aqua';
    context.fillRect(
      (offset + 80 * scale),
      offset + 23 * scale,
      185 * (1 - dash),
      10 * scale,
    );
    // context.fillRect(
    //   offset + 80 * scale,
    //   offset + 23 * scale,
    //   90 * 2 * dash,
    //   10 * scale,
    // );
  }
  //hud
  if (me.hp > 0){
    if (me.hp == 3){ image = 'hud3hp.png'};
    if (me.hp == 2){ image = 'hud2hp.png'};
    if (me.hp == 1){ image = 'hud1hp.png'};
    if (image == ''){
      console.log("something wrong with player hp: ", me.hp);
      image = 'hud1hp.png';
    }
    context.drawImage(
      getAsset(image),
      offset,
      offset,
      231 * scale,
      72 * scale,
    );
  }
  //gold display
  context.fillStyle = 'gold';
  context.font = `${20 * scale}px Comic Sans MS`;
  context.fillText(me.score, 103 * scale, 63 * scale);


  //fireCooldown
  if (fire > 0){
    //console.log(`fire cooldown: ${fireCooldown}`);
    context.fillStyle = 'white';
    context.fillRect(
      canvasX - PLAYER_RADIUS,
      canvasY + PLAYER_RADIUS + 8,
      PLAYER_RADIUS * 2 * fire,
      2,
    );
  }

  context.restore();

  //locally we want a cooldown to display for firing, for now that will go in the place of the healthbar for other ships
  //I now need to pass through server time???
  //since server calculates I need to judge the amount that this is filled based on server time rather than player time
  //export a function from the player that does all the math??
  //get the time from state? Calculation should run on server though to prevent cheating



 }else{
  context.fillStyle = 'white';
  context.fillRect(
    canvasX - PLAYER_RADIUS * 1.25,
    canvasY - PLAYER_RADIUS - 8,
    PLAYER_RADIUS * 2.5,
    4,
  );
  context.fillStyle = 'red';
  context.fillRect(
    canvasX - (PLAYER_RADIUS * 1.25) + PLAYER_RADIUS * 2.5 * player.hp / PLAYER_MAX_HP,
    canvasY - PLAYER_RADIUS - 8,
    PLAYER_RADIUS * 2.5 * (1 - player.hp / PLAYER_MAX_HP),
    4,
  );
 }
}

function renderBullet(me, bullet) {
  const { x, y } = bullet;
  context.drawImage(
    getAsset('smallfireball.png'),
    canvas.width / 2 + x - me.x - BULLET_RADIUS,
    canvas.height / 2 + y - me.y - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2,
  );
}

function renderCapAndHealPoints(capturepoints, healpoints, me, player){
  if (me == player){
    for (let i = 0; i < capturepoints.length; i++){
      context.fillStyle = "blue";
      context.beginPath();
      context.arc(capturepoints[i].x + (canvas.width / 2) - me.x, capturepoints[i].y + (canvas.height / 2) - me.y, capturepoints[i].radius, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      //Capture Point Finder Arrow
      const dx = me.x - capturepoints[i].x;
      const dy = me.y - capturepoints[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (Math.abs(capturepoints[i].x - me.x) > canvas.width / 2 || Math.abs(capturepoints[i].y - me.y) > canvas.height / 2){
        let dir = Math.atan2(capturepoints[i].x - me.x, capturepoints[i].y - me.y);
        dir -= Math.PI/2;
        let arrowX, arrowY;
        const dirRatio = (Math.cos(dir) / -Math.sin(dir));
        const screenRatio = canvas.width / canvas.height;
        if (Math.abs(Math.cos(dir) * 2) > screenRatio){
          if (Math.cos(dir) > 0){
            arrowX = canvas.width - 50; // 100 is radius * 2 rn
          }else{
            arrowX = 50;
          }
        }else{
          arrowX = (Math.cos(dir) * (canvas.width / 2)) + (canvas.width / 2) - 50;
        }
        if (Math.abs(Math.sin(dir) * 2) > screenRatio){
          if (-Math.sin(dir) > 0){
            arrowY = canvas.height - 50;
          }else{
            arrowY = 50;
          }
        }else{
          arrowY = (-Math.sin(dir) * (canvas.height / 2)) + (canvas.height / 2) - 50;
        }
        //console.log("Direction (degrees), x, y", dir, Math.cos(dir), Math.sin(dir), "\npoint xy", capturepoints[i].x, capturepoints[i].y);
        //console.log('dir, x, y', dir, arrowX, arrowY, '\ncappoint', capturepoints[i].x, capturepoints[i].y);
        //console.log('angle ratio', (-Math.sin(dir) * 2), '\nscreen ratio', (canvas.width / canvas.height));
        context.save();
        context.translate(arrowX, arrowY);
        context.rotate(-dir + Math.PI / 4);
        
        //console.log('xy cp', capturepoints[i].x, capturepoints[i].y);
        context.drawImage(
          getAsset('CPArrow.png'),
          -50,
          -50,
          100,
          100,
        );
        //context.rotate(dir);
        context.restore();
      }

      //capture progress bar
      //console.log(capturepoints[i]);
      let StringID = me.id;
      StringID = StringID.slice(0, -3);//this is a filthy solution, absolutely disgusting.. but it works
      //console.log(StringID);
      if (capturepoints[i].active){
        //console.log('point id', healpoints[i].currentPlayer.id);
        //console.log(me == healpoints[i].currentPlayer);
        if (StringID == capturepoints[i].currentPlayer.id){
          context.fillRect(
            0,
            82 * scale,
            231 * scale * (capturepoints[i].timeLeft / Constants.CAPTURE_TIME),
            30 * scale,
          );
        }else{
          context.fillRect(
            capturepoints[i].x + (canvas.width / 2) - me.x - Constants.CP_CAPTURE_RADIUS,
            capturepoints[i].y + (canvas.height / 2) - me.y - Constants.CP_CAPTURE_RADIUS * 1.5,
            Constants.CP_CAPTURE_RADIUS * 2 * (capturepoints[i].timeLeft / Constants.CAPTURE_TIME),
            10,
          );
        }
      }
    }
    for (let i = 0; i < healpoints.length; i++){
      //console.log(healpoints[i]);
      context.fillStyle = "green";
      context.beginPath();
      context.arc(healpoints[i].x + (canvas.width / 2) - me.x, healpoints[i].y + (canvas.height / 2) - me.y, healpoints[i].radius, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      //capture progress bar
      //console.log(healpoints[i]);
      let StringID = me.id;
      StringID = StringID.slice(0, -3);//this is a filthy solution, absolutely disgusting.. but it works
      //console.log(StringID);
      if (healpoints[i].active){
        //console.log('point id', healpoints[i].currentPlayer.id);
        //console.log(me == healpoints[i].currentPlayer);
        if (StringID == healpoints[i].currentPlayer.id){
          context.fillRect(
            0,
            82 * scale,
            231 * scale * (healpoints[i].timeLeft / Constants.HEAL_POINT_TIME),
            30 * scale,
          );
        }else{
          context.fillRect(
            healpoints[i].x + (canvas.width / 2) - me.x - Constants.HEAL_POINT_RADIUS,
            healpoints[i].y + (canvas.height / 2) - me.y - Constants.HEAL_POINT_RADIUS * 1.5,
            Constants.HEAL_POINT_RADIUS * 2 * (healpoints[i].timeLeft / Constants.HEAL_POINT_TIME),
            10,
          );
        }
      }
    }
  }
}

function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  //renderBackground(x, y);

  // Rerun this render function on the next frame
  animationFrameRequestId = requestAnimationFrame(renderMainMenu);
}

animationFrameRequestId = requestAnimationFrame(renderMainMenu);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  cancelAnimationFrame(animationFrameRequestId);
  animationFrameRequestId = requestAnimationFrame(render);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  cancelAnimationFrame(animationFrameRequestId);
  animationFrameRequestId = requestAnimationFrame(renderMainMenu);
}