import { closeSession, preLoad, closeWindow, alert, checkAdmin, checkServer } from '../module.js';

let close = document.getElementById('close');
let $pre = document.querySelector('.codigos');

document.addEventListener('DOMContentLoaded', () => { 
	checkServer();
	checkAdmin();
	
});

window.addEventListener('load', () => {

	close.addEventListener('click', closeSession);

	document.addEventListener('click', e => {
		closeWindow(e);	
	});

	const submit = document.getElementById('submit');
	const submitEur = document.getElementById('submit-eur');
	submit.addEventListener('click', e => {
		e.preventDefault();
		enviandoFormulario();
	});
	
	submitEur.addEventListener('click', e => {
		e.preventDefault();
		enviandoFormularioEur();
	});

	getDivisas();

});

function setDivisas(cotizacion){
	fetch(`Divisas/setDivisas`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(cotizacion)
	})
	// .then(res => res.json())
	// .then(res => console.log(res))
	.then(res => getDivisas())
}

function setDivisasEur(cotizacion){
	fetch(`Divisas/setDivisasEur`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(cotizacion)
	})
	// .then(res => res.json())
	// .then(res => console.log(res))
	.then(res => getDivisas())
}

async function getDivisas(){

	await fetch(`Divisas/getDivisas`)
	.then(res => res.json())
	.then(divisa => {
		let obj = JSON.parse(divisa);
		showDivisa(obj);
	})
	.then(() => preLoad('container-divisas'))
	.catch(error => console.log(error))
}

function showDivisa(obj){
	const [ dolar, euro ] = obj;
	const { com_divisa, ven_divisa } = dolar;

	document.getElementById('compra').value = com_divisa;
	document.getElementById('venta').value = ven_divisa;
	
	document.getElementById('compra-eur').value = euro.com_divisa;
	document.getElementById('venta-eur').value = euro.ven_divisa;
}

function enviandoFormulario(){
	const compra = document.getElementById('compra');
	const venta = document.getElementById('venta');
	const obj = { 
		compra: compra.value, 
		venta: venta.value 
	};

	if(obj.compra.trim() === '' || obj.venta.trim() === '') {
		const nodo = document.querySelector('.divisa-row');
		return alert('Todos los campos son obligatorio', 'danger', nodo);
	}
	//abrimos la ventana de confirmacion
	Swal.fire({
	  scrollbarPadding: false,
	  title: 'Seguro desea Actualizar?',
	  text: "Estas seguro de actualizar la cotización?!",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, actualizar!'
	}).then((result) => {
	  if (result.isConfirmed) {
	  	setDivisas(obj); //actualizamos la cotizacion
	    Swal.fire(
	      'Actualizado!',
	      'actualizado correctamente.',
	      'success'
	    )
	  }
	})
}

function enviandoFormularioEur(){
	const compra = document.getElementById('compra-eur');
	const venta = document.getElementById('venta-eur');
	const obj = { 
		compra: compra.value, 
		venta: venta.value 
	};

	if(obj.compra.trim() === '' || obj.venta.trim() === '') {
		const nodo = document.querySelector('.divisa-row');
		return alert('Todos los campos son obligatorio', 'danger', nodo);
	}
	//abrimos la ventana de confirmacion
	Swal.fire({
	  scrollbarPadding: false,
	  title: 'Seguro desea Actualizar?',
	  text: "Estas seguro de actualizar la cotización?!",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, actualizar!'
	}).then((result) => {
	  if (result.isConfirmed) {
		setDivisasEur(obj); //actualizamos la cotizacion
	    Swal.fire(
	      'Actualizado!',
	      'actualizado correctamente.',
	      'success'
	    )
	  }
	})
}