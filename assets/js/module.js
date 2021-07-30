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
		  		// .then(res => res.json())
		  		.then(res => {
		  			//limpiamos si hay bancos pintados previamente
		  			while(document.querySelectorAll('.form-card')[1].children.length > 0){
						document.querySelectorAll('.form-card')[1].children[0].remove();
					}
					
		  			getBancos();
	  			})
	  			.then(res => {
	  				getBancos();
	  			})
		  		
		  		
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

function alert(msj, type, nodo){

	nodo.parentNode.style.display = "flex";
	nodo.parentNode.style.alignItems = "center";
	nodo.parentNode.style.justifyContent = "center";

	let $p = document.createElement('P');

	if(nodo.parentNode.children[0].tagName !== 'P'){
		$p.classList.add('alert', `alert-${type}`)
		$p.textContent = `${msj}`;
		nodo.parentNode.prepend($p);
		setTimeout(() => {
			$p.remove();
		}, 5000);
	}
}

function closeSession(e){

	e.preventDefault();
	firebase.auth().signOut()
		.then(() => {
	  		location.href = 'login';
		}).catch((error) => {
	  
		});

}


function getUser(objOperacion = {}) {
	firebase
		.auth()
		.onAuthStateChanged((user) => {
			if (user) {
			    let uid = user.uid;
			    objOperacion = { ...objOperacion, uid };
			}else {
				location.href = 'login';
		  	}
		})
		
}

function getKey() {
	let key;
	firebase
		.auth()
		.onAuthStateChanged(user => key = user.uid);
	return key;
}

function preLoad(){
	let $pre = document.querySelector('.pre-loader');
	let $container = document.querySelector('.login-container');
	$pre.remove();
	if ($container) $container.style.display = 'grid';	
}

function loadBtn(){
	let $btn = document.getElementById('btn');
	$btn.innerHTML = `
					  <span class="spinner-border" role="status">
					  </span>
					`;
	$btn.disabled = true;
}

function getLocal(){
	let obj = JSON.parse(localStorage.getItem('operacion'));
	return obj;
}

function addLocal(operacion){
	localStorage.setItem('operacion', JSON.stringify(operacion));
}


function closeWindow(e){
	let click = e.target.parentNode.className || null;
	let check = document.querySelector('input');

	if(click !== 'hamburguesa' && click !== 'nav-items'){
		check.checked = false;
	}

}

function getBancos(){

	let contentBanck = document.querySelectorAll('.form-card');

	firebase.auth().onAuthStateChanged(user => {
		fetch('Bancos')
		.then(res => res.json())
		.then(bancos => {
						
			//remover preload del contenedor de bancos
			while(typeof contentBanck[1].children[0] !== 'undefined') {
				contentBanck[1].children[0].remove();
			}

			let bancosUser = bancos.filter(banco => banco.use_banco == user.uid);
			
			if(bancosUser.length < 1) {
				contentBanck[1].innerHTML = '<p>No hay bancos registrados</p>';
			}else{
				//eliminamos las propiedasdes para centrar
				contentBanck[1].style.justifyContent = '';
				contentBanck[1].style.alignContent = '';
			}

			bancosUser.forEach(elemento => {

				showBanco(elemento);

			})	
		})

	});

}

function showBanco(banco){ 

	let contentBanck = document.querySelectorAll('.form-card');

	let { id_banco, nom_banco, n_banco, tip_banco, mon_banco, rut_banco } = banco;
	let tipo = tip_banco == 0 ? "AHORRO" : "CORRIENTE";
	let moneda = mon_banco == 0 ? "SOLES" : "DÓLARES";
	let $div = document.createElement('div');
	$div.classList.add('bank_card');

	$div.innerHTML = `
					<div class="bank_logo"><img src="assets/img/logos/${rut_banco}"></div>
					<div class="bank_description">Banco Personal</div>
					<div class="bank_title">${nom_banco}</div>
					<div class="bank_n">${n_banco}</div>
					<div class="bank_footer">
						<div class="bank_cuenta">${tipo}</div>
						<div class="bank_moneda">${moneda}</div>
					</div>
					<div class="bank_delete" id="btn-delete" data-id="${id_banco}">
						<i class="fa fa-trash" aria-hidden="true"></i>
					</div>
	`;

	// let btnDelete = document.querySelector('.bank_delete');
	// btnDelete.addEventListener('click', deleteBank);
	
	contentBanck[1].appendChild($div);

}

async function checkAdmin(){
	firebase
		.auth()
		.onAuthStateChanged((user) => {
			if (!user) {
			    return location.href = '../login';
			}
		})
}

function checkServer(){
	firebase
		.auth()
		.onAuthStateChanged(user => {

			if(!user) return;

			let key = user.uid;
			fetch(`Admin/check_admin/${key}`)
				.then(res => res.json())
				.then(res => {
					if(!res) {
						location.href = '../Login';
					}
				})	

		})
}

function load(){
	//preload para los precios
	let $compra = document.getElementById('compra');
	let $venta = document.getElementById('venta');
	$compra.innerHTML = `
					  <span class="spinner-border" role="status">
					  </span>
					`;
	$venta.innerHTML = `
	  <span class="spinner-border" role="status">
	  </span>
	`;
	//desactivamos el boton
	document.getElementById('btn').disabled = true;
}

const consultaPrecio = () => {
	
	return fetch('Divisas')
	.then(res => res.json())
	.then(res => {
		const { com_divisa, ven_divisa } = res[0];

		document.getElementById('compra').textContent = com_divisa;
		document.getElementById('venta').textContent = ven_divisa;

		//activamos el boton
		document.getElementById('btn').disabled = false;
	})
}

async function openModalOperation(idOperacion){

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
		  n_operacion
		} = operacion[0];

	//ASIGNAR ESTADO DE LA OPERACION
	if(sta_operacion == 0){
		sta_operacion = 'En Proceso';
	}else if(sta_operacion == 1){
		sta_operacion = "Cancelado"; 
	}else if(sta_operacion == 2){
		sta_operacion = "Anulado"; 
	}else if(sta_operacion == 3){
		sta_operacion = "Completado"; 
	}

	//Datos del banco del usuario
	let queryBanco = await getBanco(ban_use_operacion);
	let bancoUser = await queryBanco.json();
	let { nom_banco, n_banco, tip_banco, mon_banco } = bancoUser[0];

	(tip_banco) ? tip_banco = 'Corriente' : tip_banco = "Ahorro";
	(mon_banco) ? mon_banco = 'Dólares' : mon_banco = "Soles";


	//Datos del banco del admin
	let queryBancoAdmin = await getBanco(ban_admin_operacion);
	let bancoAdmin = await queryBancoAdmin.json();
	let tip_bancoAdmin;
	let mon_bancoAdmin;
	(bancoAdmin[0].tip_banco) ? tip_bancoAdmin = "Corriente" : tip_bancoAdmin = "Ahorro";
	(bancoAdmin[0].mon_banco) ? mon_bancoAdmin = "Soles" : mon_bancoAdmin = "Dólares";

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
					    	<div class="ticket_items"><span class="fw-bold">Recibes en:</span> ${nom_banco} - ${n_banco} - ${tip_banco} - ${mon_banco}</div>
					    	<div class="ticket_items"><span class="fw-bold">Al Banco:</span> ${bancoAdmin[0].nom_banco} - ${bancoAdmin[0].n_banco} - ${tip_bancoAdmin} - ${mon_bancoAdmin}</div>
					    	<div class="ticket_items"><span class="fw-bold">N° Operacion:</span> ${n_operacion}</div>
					    	
					    </div>
					    <div class="ticket_rigth">
					    	<div>Envías:</div>
					    	<div><span class="ticket_amount">${can_operacion}</div>
					    	<div>Recibes:</div>
					    	<div><span class="ticket_amount">${rec_operacion}</div>
					    	<div>Estado:</div>
					    	<div class="ticket_amount">${sta_operacion}</div>
					    </div>
					  </div>`;

	swal($div);
}

function getOperacion(idOperacion){

	return fetch('Operaciones/getOperacion',{
				method: 'POST',
			  	headers: {
			  		'Content-type': 'application/json'
			  	},
			  	body: idOperacion
			})

}

function getBanco(idBanco){
	return fetch('Bancos/getBancoId',{
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: idBanco
			})
}

const checkCodigo = () => {
	return fetch('master/Codigo/getCodigos');
}

const getPrecio = () => {
	return fetch('Divisas');
}

export { 
	addBank,
	alert, 
	closeSession, 
	getUser, 
	preLoad, 
	loadBtn,
	getLocal,
	addLocal,
	getKey,
	closeWindow,
	getBancos,
	showBanco,
	checkAdmin,
	checkServer,
	load,
	consultaPrecio,
	openModalOperation,
	getPrecio,
	checkCodigo
};