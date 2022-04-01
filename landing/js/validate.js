// const $btn = document.getElementById('btn');
// const nombre = document.getElementById('nombre');
// const apellido = document.getElementById('apellido');
// const documento = document.getElementById('documento');
// const n_documento = document.getElementById('n_documento');
// const correo = document.getElementById('correo');
// const tel = document.getElementById('tel');
// const detalle = document.getElementById('detalle');

// $btn.addEventListener('click', sendForm);

async function sendForm(){
	e.preventDefault();
	let data = { nombre, apellido, documento, n_documento, correo, tel, detalle }
	validateInputEmpty(data);
	
	if(!nombre.classList.contains('input-error') &&
	!apellido.classList.contains('input-error') &&
	!documento.classList.contains('input-error') &&
	!n_documento.classList.contains('input-error') &&
	!correo.classList.contains('input-error') &&
	!tel.classList.contains('input-error') &&
	!detalle.classList.contains('input-error')){

		let values = { nombre: nombre.value, apellido: apellido.value, documento: documento.value, n_documento: n_documento.value, correo: correo.value, tel: tel.value, detalle: detalle.value }

		let query = await send(values);
		Swal.fire({
		  position: 'top-end',
		  icon: 'success',
		  title: 'Enviado Correctamente',
		  showConfirmButton: false,
		  timer: 3000
		})

	}else{
		return;
	}
	
	document.getElementById("form").reset();
	
}

function addInputError(mensaje, etiqueta){
    let $input = document.getElementById(etiqueta);
    let invalid = document.getElementById(`invalid-${etiqueta}`);
    $input.setAttribute('class','input-error');
    invalid.setAttribute('class','invalid');
    invalid.textContent = mensaje;
}

function removeInputError(etiqueta){
    let $divError = document.getElementById(`invalid-${etiqueta}`);
    let $input = document.getElementById(etiqueta);
    if($divError){
    	$input.classList.remove('input-error');
    	$divError.textContent = "";
    	$divError.classList.remove(`invalid-${etiqueta}`);  
    }
}


function validateInputEmpty({ nombre, apellido, documento, n_documento, correo, tel, detalle }){

	nombre.value.trim() == "" 
		? addInputError("Ingrese el Nombre", "nombre") 
		: removeInputError("nombre")

	apellido.value.trim() == ""
		? addInputError("Ingrese el Apellido", "apellido")
		: removeInputError("apellido")

	documento.value.trim() == ""
		? addInputError("Ingrese el tipo de documento", "documento")
		: removeInputError("documento")

	n_documento.value.trim() == ""
		? addInputError("Ingrese el numero de documento", "n_documento")
		: removeInputError("n_documento")

	correo.value.trim() == ""
		? addInputError("Ingrese el correo", "correo")
		: removeInputError("correo")

	tel.value.trim() == ""
		? addInputError("Ingrese el teléfono", "tel")
		: removeInputError("tel")

	detalle.value.trim() == ""
		? addInputError("Ingrese el detalle", "detalle")
		: removeInputError("detalle")

	//verificamos el correo
	if(correo.value.trim() !== ""){
		valueEmail(correo);
	}

}

function valueEmail(correo){
	let ExpReg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(!ExpReg.test(correo.value)){
    	addInputError("Correo Invalido", "correo")
    }
}

function send(values){
	new Promise((resolve) => {
			fetch(`http://localhost/appew/app-dolar/Libro`,{
				method: 'POST',
				headers: {
			  				'Content-type': 'application/json'
			  			},
				body: JSON.stringify(values)
			})
	})
}