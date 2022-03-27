import { updateGround, setupGround } from '/scripts/ground.js'

const BOARD_WIDTH = 100;
const BOARD_HEIGHT = 30;

const boardElement = document.querySelector('[data-board]');

setPixelToBoardScale();
window.addEventListener('resize', setPixelToBoardScale)

let lastTime;

setupGround();

function update(time)
{
	if(lastTime == null)
	{
		lastTime = time;
		window.requestAnimationFrame(update);
		return;
	}
	const delta = time - lastTime;
	updateGround(delta,1);
	lastTime = time;
	window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

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