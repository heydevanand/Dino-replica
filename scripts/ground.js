<<<<<<< HEAD
import {incrementProperty, setProperty, getProperty} from '/scripts/updateProperty.js'
=======
import {incrementProperty, setProperty, getProperty} from './updateProperty.js'
>>>>>>> c4194d2a917f85d1c7e53f52e74db26839fb092a

const groundElements = document.querySelectorAll('[data-ground]');

const speed = 0.05;

export function setupGround()
{
	groundElements[0].classList.remove('hide');
	groundElements[1].classList.remove('hide');
	setProperty(groundElements[0], '--left', 0);
	setProperty(groundElements[1], '--left', 300);
}

export function updateGround(delta, speedScale)
{
	groundElements.forEach(ground => {
		incrementProperty(ground, '--left', delta * speed * speedScale * -1);
		if(getProperty(ground, '--left') <= -300)
		{
			setProperty(ground, '--left', 300);
		}
	});
}