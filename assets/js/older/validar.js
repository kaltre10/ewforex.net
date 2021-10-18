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