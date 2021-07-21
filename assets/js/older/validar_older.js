let $form = document.getElementById('form_login');
let $correo = document.getElementById('email');
let $password = document.getElementById('pas');
let $check_pas = document.getElementById('check_pas');

window.addEventListener('load', () => {

	$form.addEventListener('submit', e => {
		e.preventDefault();
		if(validar_correo($correo)){
			console.log('enviando  formulario...');
		}else{
			console.log('error');
		}
	})

	$correo.addEventListener('keyup', () => validar_correo($correo));

	$password.addEventListener('keyup', () => validar_password($password));

	$check_pas.addEventListener('keyup', () => repeat_pas($check_pas));

})

function validar_correo(input){

	const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	if(!emailRegex.test(input.value)){
		if(!input.classList.contains('is-invalid')){
			input.classList.add('is-invalid');
			addParrafo('correo no valido', input.name);
		}
		return false;
	}else{
		removeParrafo(input);
		return true;
	}
}


function validar_password(input){

	const passRegex = /(?=.*[a-z ])\S{6,16}/;

	if(!passRegex.test(input.value)){
		if(!input.classList.contains('is-invalid')){
			input.classList.add('is-invalid');
			addParrafo('Ingrese una contraseña valida', input.name);
		}
		return false;
	}else{
		removeParrafo(input);
		if($check_pas.value.length > 0) repeat_pas($check_pas);
		return true;
	}
}

function repeat_pas(input){
	if(input.value !== $password.value){
		if(!input.classList.contains('is-invalid')){
			input.classList.add('is-invalid');
			addParrafo('Las contraseñas deben ser iguales', input.name);
		}
		return false;
	}else{
		removeParrafo(input);
		return true;
	}

}

function addParrafo(msj, type){
	let p = document.createElement('p');
	p.classList.add('p-alert');
	p.textContent = msj;
	document.getElementById(type).appendChild(p);
}

function removeParrafo(input){
	input.classList.remove('is-invalid');
		if(document.getElementById(input.name).children[2]){
			document.getElementById(input.name).removeChild(document.getElementById(input.name).children[2]);
		}
}