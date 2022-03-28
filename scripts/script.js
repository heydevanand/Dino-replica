import {updateGround, setupGround} from '/scripts/ground.js'
import {updateDino, setupDino} from '/scripts/dino.js'
import {updateCactus, setupCactus} from '/scripts/cactus.js'

const BOARD_WIDTH = 100;
const BOARD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const boardElement = document.querySelector('[data-board]');
const scoreElement = document.querySelector('[data-score]');
const startElement = document.querySelector('[data-start]');
const startAudio = new Audio('/sounds/start.mp3');
const achieveAudio = new Audio('/sounds/achieve.wav');

let speedScale;
let score;
let approxScore;

setPixelToBoardScale();
window.addEventListener('resize', setPixelToBoardScale);
document.addEventListener('keypress', (e) => {
	if(e.code == 'Space')
	start();
}, {once: true});
document.addEventListener('click', start, {once: true});

let lastTime;

function start()
{
	lastTime = null;
	speedScale = 1;
	score = 0;
	setupGround();
	setupDino();
	setupCactus();
	startAudio.play();
	startElement.classList.add('hide');
	window.requestAnimationFrame(update);
}

function update(time)
{
	if(lastTime == null)
	{
		lastTime = time;
		window.requestAnimationFrame(update);
		return;
	}
	const delta = time - lastTime;
	updateGround(delta,speedScale);
	updateDino(delta,speedScale);
	updateCactus(delta,speedScale);
	updateSpeedScale(delta);
	updateScore(delta);
	lastTime = time;
	window.requestAnimationFrame(update);
}

function updateSpeedScale(delta)
{
	speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta)
{
	score += delta * 0.01;
	approxScore = Math.floor(score);
	scoreElement.textContent = approxScore;
	if(approxScore%100 == 0 && approxScore != 0)
	{
		achieveAudio.play();
	}
}

function setPixelToBoardScale()
{
	let boardToPixelScale;
	if(window.innerWidth/window.innerHeight < BOARD_WIDTH/BOARD_HEIGHT)
	{
		boardToPixelScale = window.innerWidth/BOARD_WIDTH;
	}
	else
	{
		boardToPixelScale = window.innerHeight/BOARD_HEIGHT;
	}
	boardElement.style.width = `${BOARD_WIDTH * boardToPixelScale}px`;
	boardElement.style.height = `${BOARD_HEIGHT * boardToPixelScale}px`;
}