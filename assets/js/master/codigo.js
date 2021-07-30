import { closeSession, preLoad, closeWindow, alert, checkAdmin, checkServer } from '../module.js';

let close = document.getElementById('close');
let $btn = document.querySelector('.btn');
let $pre = document.querySelector('.codigos');

document.addEventListener('DOMContentLoaded', () => {
	checkServer();
	getCodigos();
	checkAdmin();
});

window.addEventListener('load', () => {

	preLoad();
	close.addEventListener('click', closeSession);

	document.addEventListener('click', e => {
		closeWindow(e);	
		deletecodigo(e);
	});

	//eliminando la clase "text-center" para que se vea bien en responsive
	window.addEventListener('resize', quitarcenter);
	quitarcenter();

	const submit = document.getElementById('submit');
	submit.addEventListener('click', e => {
		e.preventDefault();
		enviandoFormulario();
	});

});

function deletecodigo(e){
	if(typeof e.target.parentNode.classList !== 'undefined'){
		let nodo = e.target.parentNode.classList[0];
		if(nodo){
			let id = e.target.parentNode.dataset.id;
			if(nodo === 'delete'){
				showVentanaDelete(id);
			}
		}
	}
	
	
}

function deleteFech(id){
	fetch('Codigo/deleteCodigo', {
		method: "DELETE",
		headers: {
				'Content-Type': 'application/json'
			},
		body: JSON.stringify(id)
	})
}

function showVentanaDelete(id){
	Swal.fire({
	  scrollbarPadding: false,
	  title: 'Seguro de eliminar?',
	  text: "Estas seguro de eliminar el codigo?!",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, eliminar!'
	}).then((result) => {
	  if (result.isConfirmed) {
	  	deleteFech(id); //eliminamos el codigo
	    Swal.fire(
	      'Eliminado!',
	      'Codigo eliminado correctamente.',
	      'success'
	    ).then(resultado => getCodigos())
	  }
	})
}

function quitarcenter(){
		let arrayAcc = document.querySelectorAll('.acc');
		let arrayAccion = document.querySelectorAll('.accion');
		let arrayTextCenter = [ ...arrayAcc, ...arrayAccion ];

		if(window.matchMedia("(max-width: 828px)").matches){
			
			arrayTextCenter.forEach( element => {
				element.classList.remove('text-center');
			});

		}else{

			arrayTextCenter.forEach( element => {
				element.classList.add('text-center');
			});

		}
	}

async function getCodigos(){

	await LoadCodigos();

	fetch(`Codigo/getCodigos`)
	.then(res => res.json())
	.then(codigos => {
		let obj = JSON.parse(codigos);
		removeLoad();
		showCodigos(obj);
	})
	.catch(error => console.log(error))
	
}

function LoadCodigos(){
	
	$pre.style.margin = "100px auto";
	$pre.innerHTML = `
					  <span class="spinner-border" role="status">
					  </span>
					`;
}

function removeLoad(){
	$pre.innerHTML = '';
	$pre.style.margin = "";
}

function showCodigos(codigos){
	if(codigos.length === 0){
		document.querySelector('.codigos').innerHTML = "<p class='text-center mt-4'>No hay registros</p>"
	}
	let $fragment = document.createDocumentFragment();
	codigos.forEach( codigo => {
		let { id_codigo, num_codigo, cot_codigo, tip_codigo } = codigo;
		let $codigo = document.createElement('div');
		$codigo.classList.add('codigo');
		$codigo.innerHTML = `
							  <div class="cod-col fw-bolder tipo">Tipo</div>
							  <div class="cod-col fw-bolder columna">Codigo</div>
							  <div class="cod-col fw-bolder cotizacion">Cotizacion</div>
							  <div class="cod-col fw-bolder accion text-center">Eliminar</div>
							  <div class="cod-col tip">${tip_codigo}</div>
							  <div class="cod-col cod">${num_codigo}</div>
							  <div class="cod-col cot">${cot_codigo}</div>
							  <div class="cod-col acc text-center"><a href="#" class="delete" data-id="${id_codigo}"><i class="fas fa-trash-alt"></i></a></div>`;
		$fragment.appendChild($codigo);
	});
	$pre.appendChild($fragment);
}

function enviandoFormulario(){
	const codigo = document.getElementById('codigo');
	const cotizacion = document.getElementById('cotizacion');
	const tipo = document.getElementById('tipo');
	const obj = { 
		codigo: codigo.value, 
		cotizacion: cotizacion.value,
		tipo: tipo.value 
	};

	if(obj.codigo.trim() === '' || obj.cotizacion.trim() === '' || obj.tipo.trim() === '') {
		const nodo = document.querySelector('.container-codigos');
		return alert('todos los campos son obligatorio', 'danger', nodo);
	}
	//abrimos la ventana de confirmacion
	Swal.fire({
	  scrollbarPadding: false,
	  title: 'Seguro desea registrar?',
	  text: "Estas seguro de registrar un nuevo codigo?!",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, registrar!'
	}).then((result) => {
	  if (result.isConfirmed) {
	  	addCodigo(obj); //agregamos el codigo
	    Swal.fire(
	      'registrado!',
	      'Codigo registrado correctamente.',
	      'success'
	    )
	  }
	})
}

function addCodigo(obj){
	fetch('Codigo/addCodigo', {
		method: "POST",
		headers: {
				'Content-Type': 'application/json'
			},
		body: JSON.stringify(obj)
	})
	.then(res => getCodigos())
	.then(res => {
		document.getElementById('codigo').value = '';
		document.getElementById('cotizacion').value = '';
		document.getElementById('tipo').selectedIndex = 0;
 	})
}