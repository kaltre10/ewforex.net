import {
		closeSession,
		preLoad,
		getUser,
		closeWindow,
		checkAdmin,
		checkServer,
} from '../module.js';

let close = document.getElementById('close');
let $pre = document.querySelector('.operaciones');
let $btn = document.querySelector('.btn');

let fecha = new Date();
let mes = ((fecha.getMonth() + 1) < 10) ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1;

// document.getElementById('desde').value = mes + "/" + fecha.getDate() + "/" + fecha.getFullYear();
// document.getElementById('hasta').value = fecha.getFullYear() + '/' + mes + "/" + fecha.getDate();


document.addEventListener('DOMContentLoaded', () => {
	checkServer();
	checkAdmin();
});

window.addEventListener('load', () => {
				close.addEventListener('click', closeSession);

				$btn.addEventListener('click', e => {
					e.preventDefault();
					getOperaciones();
				});

				document.addEventListener('click', e => {
					closeWindow(e);	

					if (e.target.parentNode.classList[1] == 'che') {
						let idOperacion = e.target.parentNode.dataset.id;
						openModalOperation(idOperacion);
					}

					//verificar si seleccionamos algun boton de las acciones
					let btnA = (e.target.parentNode.classList[1]);
					let btnB = (e.target.parentNode.parentNode.classList[1]);
					if(btnA == 'est' || btnB == 'est'){
						accion(e);
					}

				});
				getOperaciones();
});

async function getOperaciones() {

				await LoadOperaciones();

				let data = {
						desde: document.getElementById('desde').value,
						hasta: document.getElementById('hasta').value,
				};

				fetch(`../Operaciones/operacionesAll`, {
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
								showOperacion(obj);
				})
				.then(() => preLoad('container-operaciones'))
				.catch(error => console.log('error'))

}

function showOperacion(objOperacion) {

	let divOperaciones = document.querySelector('.operaciones');

	let fragment = document.createDocumentFragment();

	if (objOperacion.length == 0) {
		divOperaciones.style.margin = "100px auto";
		return divOperaciones.innerHTML = 'No hay operaciones';
	}

	objOperacion.forEach(element => {

		let { id_operaciones,
			  n_operacion, 
			  tip_operacion, 
			  can_operacion, 
			  cot_operacion, 
			  rec_operacion, 
			  fec_operacion, 
			  use_operacion,
			  sta_operacion
			} = element;

		let divOperacion = document.createElement('div');

		divOperacion.classList.add('operacion');
		divOperacion.innerHTML = `
			<div class="operacion-col fw-bolder n_operacion">N° Operacion</div>
			  <div class="operacion-col fw-bolder cantidad">Envia</div>
			  <div class="operacion-col fw-bolder cotizacion">Cotizacion</div>
			  <div class="operacion-col fw-bolder recibe">Recibe</div>
			  <div class="operacion-col fw-bolder check">Ver</div>
			  <div class="operacion-col fw-bolder estado">Acciones</div>
			  <div class="operacion-col ope">#${n_operacion}</div>
			  <div class="operacion-col can">${can_operacion}</div>
			  <div class="operacion-col cot">${cot_operacion}</div>
			  <div class="operacion-col rec">${rec_operacion}</div>
			  <div class="operacion-col che" data-id="${id_operaciones}"><i class="far fa-eye"></i></div>
			  <div class="operacion-col est" data-id="${sta_operacion}">
			  	<button type="button" class="btn btn-danger btn-disable" title="cancelar"><i class="far fa-window-close"></i></button>
			  	<button type="button" class="btn btn-warning btn-disable" title="anular"><i class="far fa-thumbs-down"></i></button>
			  	<button type="button" class="btn btn-success btn-disable" title="completar"><i class="far fa-thumbs-up"></i></button>
			  </div>`;

			fragment.appendChild(divOperacion);

			divOperaciones.appendChild((fragment));

		});

	btnEstado();
	
}

function LoadOperaciones() {
	$pre.style.margin = "100px auto";
	$pre.innerHTML = `
		  <span class="spinner-border" role="status">
		  </span>
		`;
}

function removeLoad() {
	$pre.innerHTML = '';
	$pre.style.margin = "";
}

async function openModalOperation(idOperacion) {
	let query = await getOperacion(idOperacion);
	let operacion = await query.json();
	let {
		id_operaciones,
		can_operacion,
		rec_operacion,
		sta_operacion,
		fec_operacion,
		cot_operacion,
		codigo_usuario,
		ban_use_operacion,
		ban_admin_operacion,
		n_operacion,
		nom_user,
		doc_user,
		n_user,
		tel_user
	} = operacion[0];

	(sta_operacion == 0) ? sta_operacion = 'En Proceso': sta_operacion = "Completado";

	//Datos del banco del usuario
	let queryBanco = await getBanco(ban_use_operacion);
	let bancoUser = await queryBanco.json();

   	let { nom_banco = '', n_banco, tip_banco, mon_banco } = bancoUser[0];
	(tip_banco) ? tip_banco = 'Corriente': tip_banco = "Ahorro";
	(mon_banco) ? mon_banco = 'Dólares': mon_banco = "Soles";

	//Datos del banco del admin
	let queryBancoAdmin = await getBanco(ban_admin_operacion);
	let bancoAdmin = await queryBancoAdmin.json();
	let tip_bancoAdmin;
	let mon_bancoAdmin;

	(bancoAdmin[0].tip_banco) ? tip_bancoAdmin = "Corriente": tip_bancoAdmin = "Ahorro";
	(bancoAdmin[0].mon_banco) ? mon_bancoAdmin = "Soles": mon_bancoAdmin = "Dólares";

	let $div = document.createElement('div');
	$div.classList.add('ticket');
	$div.innerHTML = `<div class="ticket_head">
						<div class="ticket_titulo"><h2>Datos del Cambio</h2></div>
						<div class="ticket_logo"><i class="fas fa-search-dollar"></i></div>
					  </div>
					  <div class="ticket_body">
					    <div class="ticket_left">
					    	<div class="ticket_items"><span class="fw-bold">ID:</span> # ${id_operaciones}</div>
					    	<div class="ticket_items"><span class="fw-bold">Fecha:</span> ${fec_operacion}</div>
					    	<div class="ticket_items"><span class="fw-bold">Cotizacion:</span> ${cot_operacion}</div>
					    	<div class="ticket_items"><span class="fw-bold">Codigo:</span> ${codigo_usuario}</div>
					    	<div class="ticket_items"><span class="fw-bold">Recibe en:</span> ${nom_banco} - ${n_banco} - ${tip_banco} - ${mon_banco}</div>
					    	<div class="ticket_items"><span class="fw-bold">Al Banco:</span> ${bancoAdmin[0].nom_banco} - ${bancoAdmin[0].n_banco} - ${tip_bancoAdmin} - ${mon_bancoAdmin}</div>
					    	<div class="ticket_items"><span class="fw-bold">N° Operacion:</span> ${n_operacion}</div>
					    	
					    </div>
					    <div class="ticket_rigth">
					    	<div>El cliente envia:</div>
					    	<div><span class="ticket_amount">${can_operacion}</div>
					    	<div>Enviar:</div>
					    	<div><span class="ticket_amount">${rec_operacion}</div>
					    	<div>Estado:</div>
					    	<div class="ticket_amount">${sta_operacion}</div>
					    </div>
					    <hr /><br />
					    <div class="ticket_user">
					     	<div class="ticket_items"><span class="fw-bold">Nombre:</span> ${nom_user}</div>
					     	<div class="ticket_items"><span class="fw-bold">Documento:</span> ${doc_user} - ${n_user}</div>
					     	<div class="ticket_items"><span class="fw-bold">Teléfono:</span> ${tel_user}</div>
					    </div>
					  </div>`;

				swal($div);
}


function getOperacion(idOperacion) {
	return fetch('../Operaciones/getOperacion', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: idOperacion
			})

}

function getBanco(idBanco) {
	return fetch('../Bancos/getBancoId', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: idBanco
			}).catch(error => console.error('error al recuperar los datos del banco'))
}

function accion(e){
	let estado;
	if(e.target.children.length == 0) estado = e.target.parentNode;
	if(e.target.children.length == 1) estado = e.target;
	let idOperacion = estado.parentNode.previousElementSibling.dataset.id;

		
	swal({
		  title: "Asignar estado?",
		  text: "confirme que desea asignar el estado para esta operacion!",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  	estadoOperacion(estado.getAttribute('title'), idOperacion);
		    swal("Asignado con exito!", {
		      icon: "success",
		    });

		  } 
		});
	
}

function estadoOperacion(status, idOperacion){

	const statusOperation = { completar: "3", anular: "2", cancelar: "1" }

	status = statusOperation[status];

	let data = { idOperacion, status };

	fetch(`Operaciones/update_operacion`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(data)
    })
    .then(res => getOperaciones());
}

function btnEstado(){

	let est = document.querySelectorAll('.est');

	est.forEach(status => {

		if(status.dataset.id == '1'){
			status.children[0].classList.remove('btn-disable');
		}

		if(status.dataset.id == '2'){
			status.children[1].classList.remove('btn-disable');
		}

		if(status.dataset.id == '3'){
			status.children[2].classList.remove('btn-disable');
		}

	});

}

