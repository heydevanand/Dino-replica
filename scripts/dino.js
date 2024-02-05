<<<<<<< HEAD
import {getProperty, setProperty, incrementProperty} from '/scripts/updateProperty.js'
=======
import {getProperty, setProperty, incrementProperty} from './updateProperty.js'
>>>>>>> c4194d2a917f85d1c7e53f52e74db26839fb092a

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
<<<<<<< HEAD
	dino.src = 'images/dino-lose.png';
=======
	dino.src = './images/dino-lose.png';
>>>>>>> c4194d2a917f85d1c7e53f52e74db26839fb092a
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
<<<<<<< HEAD
		const ping = new Audio('/sounds/ping.mp3');
=======
		const ping = new Audio('./sounds/ping.mp3');
>>>>>>> c4194d2a917f85d1c7e53f52e74db26839fb092a
		ping.play();
		velocity = JUMP_SPEED;
		isJumping = true;
	}
}

function handleRun(delta,speedScale)
{
	if(isJumping)
	{
<<<<<<< HEAD
		dino.src = 'images/dino-stationary.png';
=======
		dino.src = './images/dino-stationary.png';
>>>>>>> c4194d2a917f85d1c7e53f52e74db26839fb092a
		return;
	}
	else if(currentFrameTime >= FRAME_TIME)
	{
		dinoFrame = (dinoFrame+1) % FRAME_COUNT;
<<<<<<< HEAD
		dino.src = `images/dino-run-${dinoFrame}.png`;
=======
		dino.src = `./images/dino-run-${dinoFrame}.png`;
>>>>>>> c4194d2a917f85d1c7e53f52e74db26839fb092a
		currentFrameTime -= FRAME_TIME;
	}

	currentFrameTime += delta * speedScale;
<<<<<<< HEAD
}
=======
}
>>>>>>> c4194d2a917f85d1c7e53f52e74db26839fb092a
