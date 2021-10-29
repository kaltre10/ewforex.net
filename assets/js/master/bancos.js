import { closeSession, preLoad, closeWindow, alert, checkAdmin, checkServer } from '../module.js';

let close = document.getElementById('close');
let $pre = document.querySelector('.bancos');

document.addEventListener('DOMContentLoaded', () => {
	checkServer();
	checkAdmin();
});

window.addEventListener('load', () => {

	close.addEventListener('click', closeSession);

	document.addEventListener('click', e => {
		closeWindow(e);	
		deleteBanco(e);
	});

	//eliminando la clase "text-center" para que se vea bien en responsive
	window.addEventListener('resize', quitarcenter);
	quitarcenter();

	const submit = document.getElementById('submit');
	submit.addEventListener('click', e => {
		e.preventDefault();
		enviandoFormulario();
	});


	getBancos();
});

function deleteBanco(e){
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
	fetch('Bancos/deleteBanco', {
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
	  text: "Estas seguro de eliminar el Banco?!",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, eliminar!'
	}).then((result) => {
	  if (result.isConfirmed) {
	  	deleteFech(id); //eliminamos el banco
	    Swal.fire(
	      'Eliminado!',
	      'Banco eliminado correctamente.',
	      'success'
	    ).then(resultado => getBancos())
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

async function getBancos(){

	await LoadBancos();

	fetch(`Bancos/getBancosAdmin`)
	.then(res => res.json())
	.then(bancos => {
		let obj = JSON.parse(bancos);
		removeLoad();
		showBancos(obj);
	})
	.then(() => preLoad('container-bancos'))
	.catch(error => console.log(error))
	
}

function LoadBancos(){
	
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

function showBancos(bancos){
	if(bancos.filter(banco => banco.sta_banco != 1).length === 0){
		document.querySelector('.bancos').innerHTML = "<p class='text-center mt-4'>No hay registros</p>"
	}

	let $fragment = document.createDocumentFragment();

	bancos.filter(banco => banco.sta_banco != 1).forEach( banco => {
		let { id_banco, nom_banco, n_banco, tip_banco, mon_banco, tit_banco, doc_banco, n_doc_banco, sta_banco } = banco;

		tip_banco = (tip_banco == 0) ? "Ahorro" : "Corriente";
		mon_banco = (mon_banco == 0) ? "Soles" : "Dólares";
		let $banco = document.createElement('div');
		$banco.classList.add('banco');
		$banco.innerHTML = `
							  <div class="cod-col fw-bolder nombre_banco">Banco</div>
							  <div class="cod-col fw-bolder numero">Numero</div>
							  <div class="cod-col fw-bolder tipo">Tipo</div>
							  <div class="cod-col fw-bolder moneda">Moneda</div>
							  <div class="cod-col fw-bolder titular">Titular</div>
							  <div class="cod-col fw-bolder accion text-center">Eliminar</div>
							  <div class="cod-col nom_banco">${nom_banco}</div>
							  <div class="cod-col n_banco">${n_banco}</div>
							  <div class="cod-col tip_banco">${tip_banco}</div>
							  <div class="cod-col mon_banco">${mon_banco}</div>
							  <div class="cod-col tit_banco">${tit_banco} ${doc_banco} ${n_doc_banco}</div>
							  <div class="cod-col acc text-center"><a href="#" class="delete" data-id="${id_banco}"><i class="fas fa-trash-alt"></i></a></div>`;
		$fragment.appendChild($banco);
	});
	$pre.appendChild($fragment);
}

function enviandoFormulario(){
	const banco = document.getElementById('swal-input1');
	const numero = document.getElementById('swal-input2');
	const cuenta = document.getElementById('swal-input3');
	const moneda = document.getElementById('swal-input4');
	const titular = document.getElementById('swal-input5');
	const documento = document.getElementById('swal-input6');
	const n_documento = document.getElementById('swal-input7');
	const obj = { 
		banco: banco.value,
		numero: numero.value,
		cuenta: cuenta.value,
		moneda: moneda.value,
		titular: titular.value,
		documento: documento.value,
		n_documento: n_documento.value
	};

	if( obj.banco.trim() === '' || 
		obj.cuenta.trim() === '' || 
		obj.moneda.trim() === '' || 
		obj.numero.trim() === '' ||
		obj.titular.trim() === '' ||
		obj.documento.trim() === '' ||
		obj.n_documento.trim() === ''){

		const nodo = document.querySelector('.container-bancos');
		return alert('Todos los campos son obligatorio', 'danger', nodo);
	}

	// //abrimos la ventana de confirmacion
	Swal.fire({
	  scrollbarPadding: false,
	  title: 'Seguro desea registrar?',
	  text: "Estas seguro de registrar un nuevo Banco?!",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, registrar!'
	}).then((result) => {
	  if (result.isConfirmed) {
	  	addBanco(obj); //agregamos el codigo
	    Swal.fire(
	      'Registrado!',
	      'Banco registrado correctamente.',
	      'success'
	    )
	    document.querySelector('form').reset();
	  }
	})
}

function addBanco(obj){

	firebase
		.auth()
		.onAuthStateChanged((user) => {

			let uid = user.uid;
			obj = { ...obj, uid };

			fetch('Bancos/addBanco', {
				method: "POST",
				headers: {
						'Content-Type': 'application/json'
					},
				body: JSON.stringify(obj)
			})
			// .then(res => res.json())
			// .then(res => console.log(res))
			.then(() => getBancos())
			.then(() => document.querySelector('form').reset())
	});
}