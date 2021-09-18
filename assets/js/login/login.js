import { preLoad } from '../module.js';

let $form = document.getElementById('form');
let $correo = document.getElementById('email');
let $password = document.getElementById('pas');

window.addEventListener('load', () => {

	preLoad('login-container');

	$form.addEventListener('click', e => {
		e.preventDefault();
		login($correo, $password, $form);
	})
	$correo.addEventListener('keyup', () => validar_correo($correo));

	$password.addEventListener('keyup', () => validar_password($password));

});