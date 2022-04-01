import { preLoad } from '../module.js';

let $form = document.getElementById('form');
let $correo = document.getElementById('email');
let $password = document.getElementById('pas');
let $check_pas = document.getElementById('check_pas');

window.addEventListener('load', () => {

	preLoad('login-container');

	$form.addEventListener('submit', e => {
		e.preventDefault();
		sign($correo, $password, $check_pas, $form);
	})

	$correo.addEventListener('keyup', () => validar_correo($correo));

	$password.addEventListener('keyup', () => validar_password($password, $check_pas));

	$check_pas.addEventListener('keyup', () => repeat_pas($check_pas, $password));

});