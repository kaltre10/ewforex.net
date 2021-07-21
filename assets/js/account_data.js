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
	load
} from './module.js';

document.addEventListener("DOMContentLoaded", () => { getUser() });

let close = document.getElementById('close');
let bank = document.getElementById('bank');
let bank_user = document.getElementById('bank_user');
let bank_admin = document.getElementById('bank_admin');
let $btn = document.getElementById('btn');

window.addEventListener('load', () => {

	//preload pagina
	preLoad();

	//preload para el precio
	load();

	bank.addEventListener('click', addBank);

	$btn.addEventListener('click', enviando);

	close.addEventListener('click', closeSession);

	document.addEventListener('click', e => {
		closeWindow(e);	
	});

	consultaPrecio();
	getBancos();
	getBancosAdmin();

})

function getBancos(){

	firebase.auth().onAuthStateChanged(user => {
		fetch('Bancos')
		.then(res => res.json())
		.then(bancos => {
			let id = user.uid;
			const arrayBanco = bancos.filter(banco => banco.use_banco == id );
			//seleccionamos el selec
			const $select = document.getElementById('bank_user');
			$select.innerHTML = '<option value=""> - Seleccione - </option>';
			arrayBanco.forEach( banco => {
				let {id_banco, nom_banco, n_banco, tip_banco, mon_banco} = banco;

				(mon_banco == 0) ? mon_banco = 'Soles' : mon_banco = 'Dólares';
				(tip_banco == 0) ? tip_banco = 'Ahorro' : tip_banco = 'Corriente';

				$select.innerHTML += `<option value="${banco.id_banco}">
										${nom_banco} - 
										${n_banco} - 
										${tip_banco} -
										${mon_banco}
									 </option>`
			});
		})
	});

}

function enviando(){

	if(Number(n_operacion.value) == 0 || bank_user.value == '' || bank_admin.value == '')
		return alert('Ingrese Valores Validos', 'danger', document.querySelector('.form-card'));

	let objOperacion = getLocal();

	let obj = {
		...objOperacion, 
		'bankUser': `${bank_user.value}`,
		'bankAdmin': `${bank_admin.value}`,
		'n_operacion': `${n_operacion.value}`,
	};

	addLocal(obj);
	loadBtn();
	location.href = 'check_data';

}

async function addBank(){
	event.preventDefault();

	const { value: formValues } = await Swal.fire({
	  scrollbarPadding: false,
	  title: 'Registre cuenta de Banco:',
	  html:
	    `<label>Seleccione banco:</label>
			<select id="swal-input1" class="swal2-input">
				<option value=""> - Seleccione - </option>
				<option value="BCP">(BCP) - Banco de Crédito del Perú</option>
				<option value="INTERBANCK">(Interbank) - Banco Internacional del Perú</option>
				<option value="BBVA">(BBVA) - BBVA Continental</option>
				<option value="BANBIF">(BanBif) - BanBif</option>
				<option value="SCOTIABANK">(Scotiabank) - Scotiabank</option>
				<option value="FALABELLA">(Falabella) - Banco Falabella</option>
				<option value="FINANCIERO">(Financiero) - Banco Financiero</option>
				<option value="BANCOMERCIO">(Bancomercio) - Banco de Comercio</option>
				<option value="CITIBANK">(Citibank) - Citibank Perú</option>
				<option value="MIBANCO">(Mibanco) - Mi Banco</option>
				<option value="GNB">(GNB) - Banco GNB</option>
				<option value="RIPLEY">(Ripley) - Banco Ripley</option>
				<option value="NACION">(Nacion) - Banco de la Nación</option>
			</select>` +
	    `<label>Ingrese número de cuenta:</label>
		 <input id="swal-input2" type="text" class="swal2-input" placeholder="N° de cuenta">
		<label>Tipo de cuenta:</label>
			<select id="swal-input3" class="swal2-input">
				<option value=""> - Seleccione - </option>
				<option value="0">Ahorro</option>
				<option value="1">Corriente</option>
			</select>
		<label>Moneda:</label>
			<select id="swal-input4" class="swal2-input">
				<option value=""> - Seleccione - </option>
				<option value="0">Soles</option>
				<option value="1">Dólares</option>
			</select>
		`,
	showCancelButton: true,
	preConfirm: () => {

		let banco = document.getElementById('swal-input1');
	  	let numero = document.getElementById('swal-input2');
	  	let tipo = document.getElementById('swal-input3');
	  	let moneda = document.getElementById('swal-input4');

	  	if(banco.value.trim() === '' || numero.value.trim() === '' || tipo.value.trim() === '' || moneda.value.trim() === ''){

	  		if(banco.value.trim() === '')
	  			banco.classList.add('swal2-inputerror');

	  		if(numero.value.trim() === '')
	  			numero.classList.add('swal2-inputerror');

	  		if(tipo.value.trim() === '')
	  			tipo.classList.add('swal2-inputerror');

	  		if(moneda.value.trim() === '')
	  			moneda.classList.add('swal2-inputerror');

	  		banco.addEventListener('change', () => banco.classList.remove('swal2-inputerror'));
	  		numero.addEventListener('change', () => numero.classList.remove('swal2-inputerror'));
	  		tipo.addEventListener('change', () => tipo.classList.remove('swal2-inputerror'));
	  		moneda.addEventListener('change', () => moneda.classList.remove('swal2-inputerror'));
	  		  
	  		Swal.showValidationMessage('Todos los campos son obligatorios');
	  		
	  	}else{

	  		firebase.auth().onAuthStateChanged(user => {
		  		const data = {
		  			banco: banco.value,
		  			numero: numero.value,
		  			tipo: tipo.value,
		  			moneda: moneda.value,
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
			let select = document.getElementById('bank_admin');
			res.forEach( banco => {
				let { id_banco, nom_banco, n_banco, tip_banco, mon_banco } = banco;
				(tip_banco == 0) ? tip_banco = 'Ahorro' : tip_banco = 'Corriente'; 
				(mon_banco == 0) ? mon_banco = 'Soles' : tip_banco = 'Dólares'; 
				select.innerHTML += `
							<option value="${id_banco}"> 
							${nom_banco} - 
							${n_banco} - 
							${tip_banco} - 
							${mon_banco} - 
							</optio>`;
			})
		})
}