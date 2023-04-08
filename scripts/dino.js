import {getProperty, setProperty, incrementProperty} from './updateProperty.js'

const dino = document.querySelector('[data-dino]');
const JUMP_SPEED = 0.45;
const GRAVITY = -0.0018;
const FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let currentFrameTime;
let dinoFrame;
let velocity;

export function setupDino()
{
	isJumping = false;
	dinoFrame = 0;
	currentFrameTime = 0;
	velocity = 0;
	setProperty(dino, '--bottom', 0);
	document.removeEventListener('keypress', onJump);
	document.addEventListener('keypress', onJump);
}

export function updateDino(delta,speedScale)
{
	handleRun(delta,speedScale);
	handleJump(delta);
}

export function getDinoRect()
{
	return dino.getBoundingClientRect();
}

export function setDinoLose()
{
	dino.src = './images/dino-lose.png';
}

function handleJump(delta)
{
	if(!isJumping) return;
	incrementProperty(dino, '--bottom', delta * velocity);
	if(getProperty(dino, '--bottom') <= 0)
	{
		isJumping = false;
		setProperty(dino, '--bottom', 0);
	}
	velocity += GRAVITY * delta; 
}

function onJump(e)
{
	if(e.code == 'Space' && isJumping == false)
	{
		const ping = new Audio('./sounds/ping.mp3');
		ping.play();
		velocity = JUMP_SPEED;
		isJumping = true;
	}
}

function handleRun(delta,speedScale)
{
	if(isJumping)
	{
		dino.src = './images/dino-stationary.png';
		return;
	}
	else if(currentFrameTime >= FRAME_TIME)
	{
		dinoFrame = (dinoFrame+1) % FRAME_COUNT;
		dino.src = `./images/dino-run-${dinoFrame}.png`;
		currentFrameTime -= FRAME_TIME;
	}

	currentFrameTime += delta * speedScale;
}
