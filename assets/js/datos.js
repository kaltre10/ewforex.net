import { addBank, closeSession, preLoad, getUser, alert, getKey, closeWindow, getBancos, showBanco } from './module.js';

document.addEventListener("DOMContentLoaded", () => { getUser() });

let contentBanck = document.querySelectorAll('.form-card');

window.addEventListener('load', () => {

	preLoad();
	let close = document.getElementById('close');
	let btn = document.getElementById('btn');

	close.addEventListener('click', closeSession);
	btn.addEventListener('click', addBank);

	contentBanck[1].innerHTML = `
					  <span class="spinner-border" role="status">
					  </span>
					`;

	contentBanck[0].innerHTML = `
					  <span class="spinner-border" role="status">
					  </span>
					`;
	//mostrando preload en el contenedor de usuarios y bancos
	contentBanck[1].style.justifyContent = 'center';
	contentBanck[1].style.alignContent = 'center';
	contentBanck[0].style.justifyContent = 'center';
	contentBanck[0].style.alignContent = 'center';

	getData()
	getBancos();

	// contentBanck[1].addEventListener('click', e => {
	// 	deleteBank(e);
	// });

	contentBanck[0].addEventListener('click', e => {
		addData(e);
	});

	document.addEventListener('click', e => {
		closeWindow(e);	
	});
})

function deleteBank(e){
	let nodo = e.target.parentNode.className;
	let id = e.target.parentNode.getAttribute('data-id');
	
	if(nodo == 'bank_delete'){
		Swal.fire({
		  scrollbarPadding: false,
		  title: 'Eliminar Banco?',
		  text: "Esta seguro que desea eliminar los datos del banco!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, eliminar!'
		}).then(result => {
		  if (result.isConfirmed) {

		  	editBancos(id);

		    Swal.fire({
		    	scrollbarPadding: false,
		    	title: 'Eliminado!',
		    	text: 'Los registros del banco se han eliminado.',
		    	icon: 'success',
		    })
		  }
		})
	}
	
}

function editBancos(id){
	fetch('Bancos/deleteBanco', {
		method: "DELETE",
		headers: {
				'Content-Type': 'application/json'
			},
		body: JSON.stringify(id)
	})
	.then(res => {

		while(contentBanck[1].children.length > 1){
			contentBanck[1].children[0].remove();
		}
		getBancos()
	})
}

function getData(){
	let email = firebase.auth().onAuthStateChanged(user => {

		fetch(`Usuarios/usuario/${user.uid}`)
		.then(res => res.json())
		.then(usuario => {

			//remover preload del contenedor de bancos
			contentBanck[0].children[0].remove()

			if(usuario.length == 0) return contentBanck[0].innerHTML = 'No hay datos';

			usuario.forEach(elemento => {

			//eliminamos las propiedasdes para centrar 
			contentBanck[0].style.justifyContent = '';
			contentBanck[0].style.alignContent = '';

			showUsuario(elemento, user.email);

			})
		})
		.catch(error => {
			console.log('error')
		})

	});

}

function showUsuario(usuario, email){ 

	let { nom_user, doc_user, n_user, tel_user } = usuario;

	let fragment = document.createDocumentFragment();
	let $divEmail = document.createElement('div');
	let $divNombre = document.createElement('div');
	let $divDocumento = document.createElement('div');
	let $divTelefono = document.createElement('div');
	$divEmail.classList.add('input');

	$divNombre.classList.add('input');
	$divNombre.classList.add('input');

	$divDocumento.classList.add('input');
	$divTelefono.classList.add('input');
	
	$divEmail.innerHTML = `
						<div class="input-item">
							<span><i class="fas fa-envelope-open"></i></span>
							<span> ${email}</span>
						</div>
	`;

	if(nom_user){
		$divNombre.innerHTML = `
							<div class="input-item">
								<span><i class="fas fa-user"></i></span>
								<span> ${nom_user}</span>
							</div>
		`;
	}else{
		$divNombre.innerHTML = `
							<div class="input-item">
								<span><i class="fas fa-user"></i></span>
								<span><input name="nom_user" autocomplete="off"/> <a href="" id="add"> Agregar</a></span>
							</div>
		`;
	}

	if(doc_user && n_user){
		$divDocumento.innerHTML = `
							<div class="input-item">
								<span><i class="fas fa-id-card"></i></span>
								<span> ${doc_user} - ${n_user}</span>
							</div>
		`;
	}else{
		$divDocumento.innerHTML = `
							<div class="input-item doc">
								<span><i class="fas fa-id-card"></i></span>
								<span>
								<select name="doc_user">
									<option value="DNI">DNI</option>
									<option value="PASS">PASS</option>
									<option value="CE">CE</option>
								</select>
								<input name="n_user" autocomplete="off"/> <a href="" id="add"> Agregar</a></span>
							</div>
		`;
	}

	if(tel_user){
		$divTelefono.innerHTML = `
							<div class="input-item">
								<span><i class="fas fa-mobile-alt"></i></span>
								<span> ${tel_user}</span>
							</div>
		`;
	}else{
		$divTelefono.innerHTML = `
							<div class="input-item">
								<span><i class="fas fa-mobile-alt"></i></span>
								<span><input name="tel_user" type="text" autocomplete="off"/> <a href="" id="add"> Agregar</a>
								</span>
							</div>
		`;
	}

	fragment.appendChild($divEmail);
	fragment.appendChild($divNombre);
	fragment.appendChild($divDocumento);
	fragment.appendChild($divTelefono);
	
	contentBanck[0].appendChild(fragment);

}

function addData(e){
	e.preventDefault();
	let nodo = e.target.getAttribute('id');
	let text = e.target.parentNode.firstChild.value;

	if(nodo == 'add'){

		if(typeof(text) == 'undefined') text = e.target.parentNode.children[1].value;

		if(text.trim() === '') return alert('el campo no puede estar vacio', 'danger', contentBanck[0].children[0]);
	
		Swal.fire({
		  scrollbarPadding: false,
		  title: 'Guardar Registro?',
		  text: "Una vez registrado no se podra modificar!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, Guardar!'
		}).then((result) => {
		  if (result.isConfirmed) {
		  	let tag = e.target.parentNode.children[0].localName;
		  	let input = null;
		  	let inputAux = null;
		  	let valueAux = null;

		  	//comprobar que el input sea diferente a una etiqueta "input"
		  	// si es diferente cambiarlo a la etiqueta select
		  	(tag != 'input') 
		  		? input = e.target.parentNode.children[1].name
				: input = e.target.parentNode.children[0].name

			//comprabar si se envio el select y creamos la variable para el doc_user (inputAux)
			if (input == 'n_user') {
				inputAux = e.target.parentNode.children[0].name;
				valueAux = e.target.parentNode.children[0].value;
			}

		  	editUsuario(text, input, inputAux, valueAux);

		    Swal.fire(
		      'Guardado!',
		      'Registrado correctamente.',
		      'success'
		    )
		  }
		})
	}
	
}

function editUsuario(data, input, inputAux, valueAux){

	firebase.auth().onAuthStateChanged(user => {
		let dataObj = {
			key: user.uid,
			data,
			input,
		}

		if(inputAux != null && valueAux != null){
			dataObj.inputAux = inputAux;
			dataObj.valueAux = valueAux;
		}
	
		fetch(`Usuarios/editUsuario`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dataObj)
		})
		// .then(res => res.json())
  		.then(response => {
  			// let obj = JSON.parse(response);
  			// console.log(response)
  			//mostrando preload para mostrar los datos del usuario
			contentBanck[0].innerHTML = `
							  <span class="spinner-border" role="status">
							  </span>
							`;
			//centrando el preload 
			contentBanck[0].style.justifyContent = 'center';
			contentBanck[0].style.alignContent = 'center';

			//eliminamos el preload y mostramos los datos
			getData();
  			
  		});
	
  	});

  	
}