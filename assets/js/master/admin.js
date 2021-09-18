import { preLoad, getUser, closeWindow, checkAdmin, getKey, checkServer } from '../module.js';

document.addEventListener("DOMContentLoaded", () => {
	verificationUser();
});

function verificationUser(){
	checkServer();
	checkAdmin();
}

window.addEventListener('load', () => {
	
	let close = document.getElementById('close');

	document.addEventListener('click', e => {
		closeWindow(e);	
	});

	close.addEventListener('click', e => {
		e.preventDefault();
		firebase.auth().signOut()
			.then(() => {
		  		location.href = '../login';
			});
	});

	// preLoad();
	const users = getUsers();
	users
		.then(res => showUsers(res))
		.then(() => preLoad('container-home'))
	

});

function getUsers(){
	try{

		const users = fetch('../Usuarios/getUsuarios')
						.then(res => res.json())
						.then(respuesta => respuesta)
		return users;
	
	}
	catch(error) {
		console.error('error al cargar los usuarios')
	}
	
}

function showUsers(users){
	const  $contenedor = document.getElementById('users');
	const $fragment = document.createDocumentFragment();

		//excluimos el usuario con id = 1 
		users = users.filter(user => user.id_user != 1);
	
		users.map( (user) => {
			let { id_user, nom_user, doc_user, n_user, tel_user } = user;

			nom_user = nom_user || 'Sin definier';
			doc_user = doc_user || 'Sin definier';
			n_user = n_user || 'Sin definier';
			tel_user = tel_user || 'Sin definier';
			
			let $userDiv = document.createElement('div');
			$userDiv.classList.add('usuario');
			$userDiv.innerHTML = `<div class="usuario-col fw-bolder id">ID</div>
							  <div class="usuario-col fw-bolder nombre">Nombre</div>
							  <div class="usuario-col fw-bolder documento">Documento</div>
							  <div class="usuario-col fw-bolder numero">Número</div>
							  <div class="usuario-col fw-bolder telefono">Telefono</div>
							  <div class="usuario-col id_user">#${id_user}</div>
							  <div class="usuario-col nom_user">${nom_user}</div>
							  <div class="usuario-col doc_user">${doc_user}</div>
							  <div class="usuario-col num_user">${n_user}</div>
							  <div class="usuario-col tel_user">${tel_user}</div>`;
			$fragment.appendChild($userDiv);
		})
	$contenedor.appendChild($fragment);
}