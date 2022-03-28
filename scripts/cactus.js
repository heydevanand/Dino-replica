import {getProperty, setProperty, incrementProperty} from '/scripts/updateProperty.js';

const CACTUS_INTERVAL_MIN = 650;
const CACTUS_INTERVAL_MAX = 2000;

const boardElement = document.querySelector('[data-board]');

const speed = 0.05;

let nextCactusTime = 0;

export function setupCactus()
{
	nextCactusTime = CACTUS_INTERVAL_MIN;
	document.querySelectorAll('[data-cactus]').forEach(cactus => {
		cactus.remove();
	});
}

export function updateCactus(delta,speedScale)
{
	document.querySelectorAll('[data-cactus]').forEach(cactus => {
		incrementProperty(cactus, '--left', delta * speed * speedScale * -1);
		if(getProperty(cactus, '--left') <= -10)
		{
			cactus.remove();
		}
	});
	if(nextCactusTime <= 0)
	{
		createCactus();
		nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale;
	}
	nextCactusTime -= delta;
}

function createCactus()
{
	const cactus = document.createElement('img');
	cactus.dataset.cactus = true;
	cactus.src = 'images/cactus.png';
	cactus.classList.add('cactus');
	setProperty(cactus, '--left', 100);
	boardElement.append(cactus);
}

function randomNumberBetween(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getCactusRects()
{
	return [...document.querySelectorAll('[data-cactus]')].map(cactus => {
		return cactus.getBoundingClientRect();
	});
}