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
  const { me, others, bullets, capturepoints, healpoints } = getCurrentState();
  if (me) {//only does this for the local player, not other clients
    //console.log(`fire: ${fire}`);
    // Draw background
    renderBackground(me.x, me.y);

    // Draw boundaries
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

    // Draw all bullets
    bullets.forEach(renderBullet.bind(null, me));

    //Draw Capture and Heal points
    renderCapAndHealPoints(capturepoints, healpoints, me, me);

    // Draw all players
    renderPlayer(me, me);
    others.forEach(renderPlayer.bind(null, me));
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

    //mouse position to screen position collider generation
    // for (let i = 0; i < colliderCount(); i++){
    //   fillRect(generateColliders(me.x, me.y));
    // }
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
  context.drawImage(
    //instead of drawing one image, I will need to draw an image based on both the previous image as well as the direction the player is moving...
    getAsset('magechar.png'),
    -PLAYER_RADIUS,
    -PLAYER_RADIUS,
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  );
  context.restore();




 //draws players local healthbar in the top left and draws other players health bars underneath them
 if (me == player){
  let image = '';
  let offset = 3;
  let scale = 1.5;
  //dashCooldown
  if (dash > 0){
    //console.log(`fire cooldown: ${fireCooldown}`);
    context.fillStyle = 'aqua';
    context.fillRect(
      offset + 80 * scale,
      offset + 23 * scale,
      90 * 2 * dash,
      10 * scale,
    );
  }

  if (me.hp > 0){
    if (me.hp == 3){ image = 'hud3hp.png'};
    if (me.hp == 2){ image = 'hud2hp.png'};
    if (me.hp == 1){ image = 'hud1hp.png'};
    context.drawImage(
      getAsset(image),
      offset,
      offset,
      231 * scale,
      72 * scale,
    );
  }


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
    }
    for (let i = 0; i < healpoints.length; i++){
      //console.log(healpoints[i]);
      context.fillStyle = "green";
      context.beginPath();
      context.arc(healpoints[i].x + (canvas.width / 2) - me.x, healpoints[i].y + (canvas.height / 2) - me.y, healpoints[i].radius, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
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