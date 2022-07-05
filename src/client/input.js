//while the example project only needs direction and shooting, I need more than this... will have to update position based on current input too
import Player from "../server/player";
import { updateDirection } from "./networking";
import { tryShoot } from "./networking";
const Constants = require('../shared/constants');
//mouse for direction the player is looking/aiming
//wasd for movement
//mouse0 (leftclick) to throw fireball (if available), here it can just try to throw
//a fireball and the server will then decide whether or not it can
//<SPACE> for dashing, dash in direction of mouse, start dash cooldown... dash is more like a teleport
//Recall/leave the game and keep your rewards with <b> or <onscreenbutton>... Recall begins 6 second
//timer where the player cannot move or shoot and is vulnerable. Taking damage cancels the recall 
//(perhaps allow players to give input in this phase but if they do cancel recall, less vulnerable
//but perhaps more fair since they can still take damage in this phase?)

//make controls customizeable on PC?
//mobile necessary?


//PC
//for simplicity and testing im mostly going to follow the example until everything is working


//may need one of these for every key?

function onMouseInput(e) {
  console.log(e.clientX, e.clientY);
}
function onMouseClick(event){
  //sends input to networking.js which sends input to the server (server.js) which sends input to game.js which finally goes to player.js
  //sends the mouse location so that the bullet goes in the direction the mouse is, but not the direction the player is facing.
  const mouseDir = Math.atan2(event.clientX - window.innerWidth / 2, window.innerHeight / 2 - event.clientY);
  tryShoot(mouseDir);
}
//Really interesting movement code lol
let speed = Constants.PLAYER_SPEED;
let x = width / 2;
let y = height / 2;
let w = false;
let a = false;
let s = false;
let d = false;
let height = window.innerHeight;
let width = window.innerWidth;
console.log(`center: ${x}, ${y}`);
gotInput();//run this once at the start to show that the player is not moving (prevents moving without player input on start)
function onKeyDown(event){
  if (event.key === 'd'){
    d = true;
  }
  if (event.key === 'a'){
    a = true;
  }
  if (event.key === 'w'){
    w = true;
  } 
  if (event.key === 's'){
    s = true;
  }
  gotInput();
}
function onKeyUp(event){
  if (event.key === 'd'){
    d = false;
  }
  if (event.key === 'a'){
    a = false;
  }
  if (event.key === 'w'){
    w = false;
  } 
  if (event.key === 's'){
    s = false;
  }
  gotInput();
}
function gotInput(){
  if (speed === 0){
    speed = Constants.PLAYER_SPEED;
  }
  if (d === true){
    x = width / 2 + 10;
  }
  if (a === true){
    x = width / 2 - 10;
  }
  if (w === true){
    y = height / 2 - 10;
  } 
  if (s === true){
    y = height / 2 + 10;
  }
  if (!d && !a){
    x = width / 2;
  }
  if (!w && !s){
    y = height / 2;
  }
  if (!w && !s && !a && !d){
    speed = 0;
  }
  console.log(`w: ${w} a: ${a} s: ${s} d: ${d}`)
  handleInput(x, y);
}

function Dash(event){
  if (event.keyCode == 32){
    //teleport player forward and start a dash cooldown which is removed on fireball hit or 4 seconds.
    console.log("Dash!");
  }
}

function handleInput(x, y) {
  const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  updateDirection(dir, speed);
}

//MOBILE



//BOTH
export function startCapturingInput(){
    window.addEventListener('mousemove', onMouseInput);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('click', onMouseClick);
    window.addEventListener('keypress', Dash);
    //window.addEventListener('keydown', onKeyInput);
}
export function stopCapturingInput(){
    window.removeEventListener('mousemove', onMouseInput);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('click', onMouseClick);
    window.removeEventListener('keypress', Dash);
    //window.removeEventListener('keydown', onKeyInput);
}

/*
// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateDirection } from './networking';

function onMouseInput(e) {
  handleInput(e.clientX, e.clientY);
}

function onTouchInput(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function handleInput(x, y) {
  const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  updateDirection(dir);
}

export function startCapturingInput() {
  window.addEventListener('mousemove', onMouseInput);
  window.addEventListener('click', onMouseInput);
  window.addEventListener('touchstart', onTouchInput);
  window.addEventListener('touchmove', onTouchInput);
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
  window.removeEventListener('touchstart', onTouchInput);
  window.removeEventListener('touchmove', onTouchInput);
}*/
