import { closeSession, preLoad, getUser, closeWindow, openModalOperation, openLoad } from './module.js';

let close = document.getElementById('close');
let $pre = document.querySelector('.operaciones');
let $btn = document.querySelector('.btn');


document.addEventListener('DOMContentLoaded', () => getUser());

window.addEventListener('load', () => {

	getOperaciones();	
	
	close.addEventListener('click', closeSession);

	$btn.addEventListener('click', e => {
		e.preventDefault();
		getOperaciones();
	});

	document.addEventListener('click', e => {
		closeWindow(e);	
	});

	document.addEventListener('click', e => {
		if(e.target.parentNode.classList[1] == 'icono'){
			let idOperacion = e.target.parentNode.dataset.id;
			openLoad();
			openModalOperation(idOperacion);
		}
	});

	preLoad('container-operaciones');
});

async function getOperaciones(){

	await LoadOperaciones();

	await firebase.auth().onAuthStateChanged(user => {

		let data = {
			desde: document.getElementById('desde').value,
			hasta: document.getElementById('hasta').value,
			id: user.uid
		};

		fetch(`Operaciones/operaciones`, {
			method: 'POST',
		    headers: {
		      'Content-Type': 'application/json'
		    },
    		body: JSON.stringify(data)
		})
		.then(res => res.text())
		.then(operaciones => {
			let obj = JSON.parse(operaciones);
			removeLoad();
			showOperacion(obj, user.uid);
		})
		.catch(error => console.log('error'))
			
	})
	
}

function showOperacion(objOperacion, idUser){

	let divOperaciones = document.querySelector('.operaciones');

	let fragment = document.createDocumentFragment();
	
	let operacionesUser = objOperacion.filter( operacion => operacion.use_operacion == idUser);

	if(operacionesUser.length == 0){
		divOperaciones.style.margin = "100px auto";
		return divOperaciones.innerHTML = 'No hay operaciones';
	}
	
	operacionesUser.forEach(element => {

		let { id_operaciones, can_operacion, cot_operacion, rec_operacion, sta_operacion, fec_operacion } = element;
		//configurar estado de la operacion
		if(sta_operacion == 0){
			sta_operacion = "<span class='badge bg-info text-dark'>En Proceso</span>";
		}else if(sta_operacion == 1){
			sta_operacion = "<span class='badge bg-danger'>Cancelado</span>";
		}else if(sta_operacion == 2){
			sta_operacion = "<span class='badge bg-warning'>Anulado</span>";
		}else if(sta_operacion == 3){
			sta_operacion = "<span class='badge bg-success'>Completado</span>";
		}

		let divOperacion = document.createElement('div');
		divOperacion.classList.add('operacion');
		divOperacion.innerHTML = `
		  <div class="operacion-col fw-bolder cantidad">Envías</div>
		  <div class="operacion-col fw-bolder cotizacion">Cotizacion</div>
		  <div class="operacion-col fw-bolder recibe">Recibes</div>
		  <div class="operacion-col fw-bolder status">Estado</div>
		  <div class="operacion-col fw-bolder fecha">Fecha</div>
		  <div class="operacion-col fw-bolder detalle">Detalle</div>

		  <div class="operacion-col can">${can_operacion}</div>
		  <div class="operacion-col cot">${cot_operacion}</div>
		  <div class="operacion-col rec">${rec_operacion}</div>
		  <div class="operacion-col sta d-flex align-items-start">${sta_operacion}</div>
		  <div class="operacion-col fec">${fec_operacion}</div>
		  <div class="operacion-col icono det" data-id="${id_operaciones}">
   		  <i data-bs-toggle="tooltip" 
   			 title="Click para ver los detalles de la operacion." class="fas fa-clipboard-list"></i>
		  </div>`;
		fragment.appendChild(divOperacion);
	});

	divOperaciones.appendChild((fragment));

}

function LoadOperaciones(){
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