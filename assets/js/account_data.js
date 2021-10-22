import { 
	closeSession,
	alert, 
	preLoad, 
	getUser, 
	loadBtn, 
	getLocal, 
	addLocal, 
	closeWindow, 
	consultaPrecio,
	load,
	getBankAdmin
} from './module.js';

document.addEventListener("DOMContentLoaded", () => { getUser() });

let close = document.getElementById('close');
let bank = document.getElementById('bank');
let bank_user = document.getElementById('bank_user');
let bank_admin = document.getElementById('bank_admin');
let $btn = document.getElementById('btn');
let objOperacion = getLocal();

window.addEventListener('load', () => {

	//preload pagina

	//preload para el precio
	load();

	bank.addEventListener('click', addBank);

	$btn.addEventListener('click', enviando);

	close.addEventListener('click', closeSession);

	document.addEventListener('click', e => {
		closeWindow(e);	
	});

	bank_admin.addEventListener('click', () => {
		getBancosAdmin();
	});

	bank_user.addEventListener('click', () => {
		getBancos();
	});

	consultaPrecio();

	preLoad('container-home');

})

function getBancos(){

	firebase.auth().onAuthStateChanged(user => {
		fetch('Bancos')
			.then(res => res.json())
			.then(bancos => {
				let id = user.uid;
				const arrayBanco = bancos.filter(banco => banco.use_banco == id );
				let bancosUser = [];
				if(objOperacion['tipo'] == 'COMPRA'){
					bancosUser = arrayBanco.filter( b => b.mon_banco == 0 );
				}else{
					bancosUser = arrayBanco.filter( b => b.mon_banco == 1 );
				}
				// console.log(bancosUser)
				getBankAdmin(bancosUser, 'bank_user');

		})
	})

}

function enviando(){
	let banUser = bank_user.dataset.id || '';
	let banAdmin = bank_admin.dataset.id || '';

	if(Number(n_operacion.value) == 0 || banUser == '' || banAdmin == ''){

		if(banUser == '') bank_user.style.border = `1px solid tomato`;
		if(banAdmin == '') bank_admin.style.border = `1px solid tomato`;
		if(Number(n_operacion.value) == 0) n_operacion.style.border = `1px solid tomato`;

		setTimeout(() => {
			bank_user.style.border = `1px solid #f4f7ff`;
			bank_admin.style.border = `1px solid #f4f7ff`;
			n_operacion.style.border = `1px solid #f4f7ff`;
		}, 4000);
		
		alert('Ingrese Valores Validos', 'danger', document.querySelector('.form-card'));
		return;
	}

	let obj = {
		...objOperacion, 
		'bankUser': `${bank_user.dataset.id}`,
		'bankAdmin': `${bank_admin.dataset.id}`,
		'n_operacion': `${n_operacion.value}`,
	};

	addLocal(obj);
	loadBtn();
	location.href = 'check_data';
}

async function addBank(){
	event.preventDefault();

	let moneda;
	if(objOperacion['tipo'] == 'COMPRA'){
		moneda = `<option value="0">Soles</option>`;
	}else{
		moneda = `<option value="1">Dólares</option>`;
	}

	const { value: formValues } = await Swal.fire({
	  scrollbarPadding: false,
	  title: 'Registre cuenta de Banco:',
	  html:
	    `<div class="modal-banco">
	    	<div class="form-group">
	    		<div>
		    		<label>Seleccione banco:</label>
					<select id="swal-input1" class="swal2-input">
						<option value=""> - Seleccione - </option>
						<option value="bcp">(BCP) - Banco de Crédito del Perú</option>
						<option value="interbank">(Interbank) - Banco Internacional del Perú</option>
						<option value="bbva">(BBVA) - BBVA Continental</option>
						<option value="banbif">(BanBif) - BanBif</option>
						<option value="scotiabank">(Scotiabank) - Scotiabank</option>
						<option value="falabela">(Falabella) - Banco Falabella</option>
						<option value="financiero">(Financiero) - Banco Financiero</option>
						<option value="bancomercio">(Bancomercio) - Banco de Comercio</option>
						<option value="citibank">(Citibank) - Citibank Perú</option>
						<option value="mibanco">(Mibanco) - Mi Banco</option>
						<option value="gnu">(GNB) - Banco GNB</option>
						<option value="ripley">(Ripley) - Banco Ripley</option>
						<option value="nacion">(Nacion) - Banco de la Nación</option>
					</select>
				</div>
	    	` +
			`
				<div>
					<label>Tipo de cuenta:</label>
					<select id="swal-input3" class="swal2-input">
						<option value=""> - Seleccione - </option>
						<option value="0">Ahorro</option>
						<option value="1">Corriente</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<div>
					<label>Ingrese número de cuenta:</label>
					<input id="swal-input2" type="text" class="swal2-input" placeholder="N° de cuenta">
				</div>
				<div>
					<label>Moneda:</label>
					<select id="swal-input4" class="swal2-input">
						<option value=""> - Seleccione - </option>
						${moneda}
					</select>
				</div>
			</div>
				<label>Nombre del Titular / Razón Social:</label>
				 <input id="swal-input5" type="text" class="swal2-input" placeholder="Nombre del Titular / Razón Social">
			<div class="form-group">
				<div>
					<label>Tipo de Documento:</label>
					<select id="swal-input6" class="swal2-input">
						<option value=""> - Seleccione - </option>
						<option value="DNI">DNI</option>
						<option value="PASS">Pasaporte</option>
						<option value="CE">Carnet de Extranjería</option>
						<option value="RUC">RUC</option>
					</select>
				</div>
				<div>
					<label>Número de Documento:</label>
				 	<input id="swal-input7" type="text" class="swal2-input" placeholder="Número de Documento">
				</div>
			</div>
		<div>`,
	showCancelButton: true,
	preConfirm: () => {

	  	let banco = document.getElementById('swal-input1');
	  	let numero = document.getElementById('swal-input2');
	  	let tipo = document.getElementById('swal-input3');
	  	let moneda = document.getElementById('swal-input4');
	  	let titular = document.getElementById('swal-input5');
	  	let documento = document.getElementById('swal-input6');
	  	let n_documento = document.getElementById('swal-input7');

	  	if( banco.value.trim() === '' || 
	  		numero.value.trim() === '' ||
	  		tipo.value.trim() === '' ||
	  		moneda.value.trim() === '' ||
	  		titular.value.trim() === '' ||
	  		documento.value.trim() === '' ||
	  		n_documento.value.trim() === ''){

	  		if(banco.value.trim() === '')
	  			banco.classList.add('swal2-inputerror');

	  		if(numero.value.trim() === '')
	  			numero.classList.add('swal2-inputerror');

	  		if(tipo.value.trim() === '')
	  			tipo.classList.add('swal2-inputerror');

	  		if(moneda.value.trim() === '')
	  			moneda.classList.add('swal2-inputerror');

	  		if(titular.value.trim() === '')
	  			titular.classList.add('swal2-inputerror');

	  		if(documento.value.trim() === '')
	  			documento.classList.add('swal2-inputerror');

	  		if(n_documento.value.trim() === '')
	  			n_documento.classList.add('swal2-inputerror');

	  		banco.addEventListener('change', () => banco.classList.remove('swal2-inputerror'));
	  		numero.addEventListener('change', () => numero.classList.remove('swal2-inputerror'));
	  		tipo.addEventListener('change', () => tipo.classList.remove('swal2-inputerror'));
	  		moneda.addEventListener('change', () => moneda.classList.remove('swal2-inputerror'));
	  		titular.addEventListener('change', () => titular.classList.remove('swal2-inputerror'));
	  		documento.addEventListener('change', () => documento.classList.remove('swal2-inputerror'));
	  		n_documento.addEventListener('change', () => n_documento.classList.remove('swal2-inputerror'));

	  		Swal.showValidationMessage('Todos los campos son obligatorios');
	  		
	  	}else{

	  		firebase.auth().onAuthStateChanged(user => {
		  		const data = {
		  			banco: banco.value,
		  			numero: numero.value,
		  			tipo: tipo.value,
		  			moneda: moneda.value,
		  			titular: titular.value,
		  			documento: documento.value,
		  			n_documento: n_documento.value,
		  			user: user.uid
		  		}

	  			fetch('Bancos/insertBanco', {
		  			method: 'POST',
		  			headers: {
		  				'Content-type': 'application/json'
		  			},
		  			body: JSON.stringify(data)
	  			})
		  		.then(res => getBancos())
		  })

	  	}

	}
	})

	if (formValues) {
	  Swal.fire({
		  icon: 'success',
		  title: 'Banco Registrado',
		  showConfirmButton: false,
		  timer: 1500
		})
	}
}

function getBancosAdmin(){

	fetch('Bancos/getBancosAdmin')
		.then(res => res.json())
		.then(res => {

			let bancosAdmin = [];
			if(objOperacion['tipo'] == 'COMPRA'){
				bancosAdmin = res.filter( b => b.mon_banco == 1 );
			}else{
				bancosAdmin = res.filter( b => b.mon_banco == 0 );
			}

			getBankAdmin(bancosAdmin, 'bank_admin');

		})
}