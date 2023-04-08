import {updateGround, setupGround} from '/scripts/ground.js'
import {updateDino, setupDino, getDinoRect, setDinoLose} from '/scripts/dino.js'
import {updateCactus, setupCactus, getCactusRects} from '/scripts/cactus.js'

const BOARD_WIDTH = 100;
const BOARD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const boardElement = document.querySelector('[data-board]');
const scoreElement = document.querySelector('[data-score]');
const startElement = document.querySelector('[data-start]');
const ping = new Audio('./sounds/ping.mp3');
const achieveAudio = new Audio('./sounds/achieve.wav');
const end = new Audio('./sounds/end.wav');

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
	ping.play();
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
	if(checkLose()) return handleLose();
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

function checkLose()
{
	const dinoRect = getDinoRect();
	return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2)
{
	// console.log(`Dino :\nTop: ${rect2.top}\nBottom: ${rect2.bottom}\nLeft: ${rect2.left}\nRight: ${rect2.right}`);
	return (
		rect1.left +10 < rect2.right -10 &&
		rect1.right -10 > rect2.left +5 &&
		rect1.top +10 < rect2.bottom -10 &&
		rect1.bottom > rect2.top
	)
}

function handleLose()
{
	setDinoLose();
	end.play();
	setTimeout(() => {
		document.addEventListener('keypress', start, { once: true });
	}, 300);
	startElement.classList.remove('hide');
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