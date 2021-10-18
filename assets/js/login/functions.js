async function sign($correo, $password, $check_pas, $form){
	if(validar_correo($correo) && validar_password($password) && repeat_pas($check_pas, $password)){
		const userObj = {
			correo: $correo.value,
			password: $password.value
		}
		loadBtn();
		await createUser(userObj, $form);


	}
}

function login(correo, password, form){
	if(validar_correo(correo) && validar_password(password)){
		const userObj = {
			correo: correo.value,
			password: password.value
		}
		loadBtn();
		loginUser(userObj, form);
	}
}

function reset($correo, $form){
	if(validar_correo($correo)){
		loadBtn();
		resetUser($correo, $form);
	}
}

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


function validar_password(input, $check_pas){

	const passRegex = /(?=.*[0-9a-z ])\S{6,16}/;

	if(!passRegex.test(input.value)){
		if(!input.classList.contains('is-invalid')){
			input.classList.add('is-invalid');
			addParrafo('Ingrese una contraseña valida (minimo 6 digitos)', input.name);
		}
		return false;
	}else{
		removeParrafo(input);
		if(typeof($check_pas) !== 'undefined' && $check_pas.value.length > 0) repeat_pas($check_pas, input);
		return true;
	}
}

function repeat_pas(input, $password){
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
	document.getElementById(type).children[1].focus();
	document.getElementById(type).appendChild(p);
}

function removeParrafo(input){
	input.classList.remove('is-invalid');
		if(document.getElementById(input.name).children[2]){
			document.getElementById(input.name).removeChild(document.getElementById(input.name).children[2]);
		}
}

let loadBtn = function(){
	let $btn = document.getElementById('btn');
	$btn.disabled = true;
    $btn.innerHTML = `
					  <span class="spinner-border" role="status">
					  </span>
					`;
}

function alert(msj, type, nodo){
	
	if(nodo.parentNode.children[0].tagName != 'P')
		$p = document.createElement('p');
		$p.classList.add('alert', `alert-${type}`)
		$p.textContent = `${msj}`;
		nodo.parentNode.prepend($p);
		setTimeout(() => {
			$p.remove();
		}, 5000);
}

function removeLoadBtn(text){
	let $btn = document.getElementById('btn');
	$btn.innerHTML = text;
	$btn.disabled = false;
}

function createUser(userObj, nodo){
	firebase.auth().createUserWithEmailAndPassword(userObj.correo, userObj.password)
	  .then( credencial => {

    		let user = credencial.user;
    		insertUserDB(user.uid);

	  })
	  .then(res => {
	  		alert('Cuenta creada con exito, por favor revise su correo electrónico para verificar su cuenta.', 'success', nodo);
	  		sendEmail();
	    	removeLoadBtn('Registrar');	
	    	nodo.reset();
	  })
	  .catch( error => {
	  	let msjError;
	    switch(error.code){
	    	case 'auth/email-already-in-use':
	    		msjError = 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.';
	    	break;
	    	default:
	    		msjError = 'Disculpe ha ocurrido un error al registrar su cuenta. por favor vuelve a intentar';

	    }
	    alert(msjError, 'danger', nodo);
	    removeLoadBtn('Registrar');
	  });

} 

function sendEmail(){
	var user = firebase.auth().currentUser;
	user.sendEmailVerification().catch(error => console.log(error));
}

function resetUser(email, nodo){
	let auth = firebase.auth();
	try {
		auth.sendPasswordResetEmail(email.value)
			.then(res => {
		  		alert('Se ha enviado un correo para recuerar su cuenta', 'success', nodo);
		  		removeLoadBtn('Recuperar cuenta');
		  		form.reset();
			})
			.catch(error => {
		  		alert('Este correo no existe, por favor verifique y vuelva a intentar', 'danger', nodo);
		  		removeLoadBtn('Recuperar cuenta');
			});
		 	
	} catch(error) {
		alert('disculpe ha ocurrido un error, vuelva a intentar.', 'danger', nodo);
		removeLoadBtn('Recuperar cuenta'); 
	}
}

function loginUser(obj, form){

	let { correo, password } = obj;

	let auth = firebase.auth();
	try {	
		firebase.auth().signInWithEmailAndPassword(correo, password)
		  .then((user) => {
		   	alert('Iniciando sesion...', 'success', form);
		  		removeLoadBtn('Entrar');
		  		form.reset();
		  		let auth = firebase.auth().currentUser;
		  		
		  		const getID = getUserDB(auth.uid);
		  		
		  		getID.then(res => {
		  			if(res > 1){
		  				location.href = 'Admin';
			  		}else{
			  			location.href = 'master/Admin';
			  		}
		  		})
		  })
		  .catch((error) => {
		    alert('Error, correo o contraseña incorrecta', 'danger', form);
		  	removeLoadBtn('Entrar');
		  });		 	
	} catch(error) {
		alert('disculpe ha ocurrido un error, vuelva a intentar.', 'danger', form);
		removeLoadBtn('Entrar'); 
	}
}

function getUserDB(user){
	return fetch(`Usuarios/usuario/${user}`)
				.then(res => res.json())
				.then(respuesta => respuesta[0].id_user)
}

function insertUserDB(id){
	fetch(`Usuarios/insertUsuario`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(id)
	})
}