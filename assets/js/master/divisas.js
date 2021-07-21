import { closeSession, preLoad, closeWindow, alert, checkAdmin, checkServer } from '../module.js';

let close = document.getElementById('close');
let $pre = document.querySelector('.codigos');

document.addEventListener('DOMContentLoaded', () => { 
	checkServer();
	getDivisas();
	checkAdmin();
});

window.addEventListener('load', () => {

	preLoad();
	close.addEventListener('click', closeSession);

	document.addEventListener('click', e => {
		closeWindow(e);	
	});

	const submit = document.getElementById('submit');
	submit.addEventListener('click', e => {
		e.preventDefault();
		enviandoFormulario();
	});

});

function setDivisas(cotizacion){
	fetch(`Divisas/setDivisas`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(cotizacion)
	})
	.then(res => getDivisas())
}

async function getDivisas(){

	fetch(`Divisas/getDivisas`)
	.then(res => res.json())
	.then(divisa => {
		let obj = JSON.parse(divisa);
		showDivisa(obj);
	})
	.catch(error => console.log(error))
}

function showDivisa(obj){
	const [ dolar ] = obj;
	const { com_divisa, ven_divisa } = dolar;
	document.getElementById('compra').value = com_divisa;
	document.getElementById('venta').value = ven_divisa;
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