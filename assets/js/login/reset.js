import { preLoad } from '../module.js';

let $form = document.getElementById('form');
let $correo = document.getElementById('email');

window.addEventListener('load', () => {

	preLoad();

	$form.addEventListener('submit', e => {
		e.preventDefault();
		reset($correo, $form);
	})

	$correo.addEventListener('keyup', () => validar_correo($correo));

});