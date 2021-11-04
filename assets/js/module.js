async function addBank(){

	event.preventDefault();

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
						<option value="falabella">(Falabella) - Banco Falabella</option>
						<option value="financiero">(Financiero) - Banco Financiero</option>
						<option value="bancomercio">(Bancomercio) - Banco de Comercio</option>
						<option value="citibank">(Citibank) - Citibank Perú</option>
						<option value="mibanco">(Mibanco) - Mi Banco</option>
						<option value="gnb">(GNB) - Banco GNB</option>
						<option value="ripley">(Ripley) - Banco Ripley</option>
						<option value="nacion">(Nacion) - Banco de la Nación</option>
						<option value="pichincha">(Pichincha) - Banco Pichincha</option>
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
						<option value="0">Soles</option>
						<option value="1">Dólares</option>
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
	  		  
	  		Swal.showValidationMessage();
	  		
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
		  		// .then(res => res.json())
		  		// .then(res => console.log(res))
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

async function getBankAdmin(data, addNode){

	let div = document.createElement('div');
	let fragment = document.createDocumentFragment();

	data.forEach( banco => {
						let { id_banco, nom_banco, n_banco, tip_banco, mon_banco, rut_banco, tit_banco, doc_banco, n_doc_banco } = banco;

						(tip_banco == 0) ? tip_banco = 'Ahorro' : tip_banco = 'Corriente'; 
						(mon_banco == 0) ? mon_banco = 'Soles' : mon_banco = 'Dólares'; 

						let bank_card = document.createElement('div');
						bank_card.classList.add('bank_card');
						bank_card.dataset.id = id_banco;
						let item = document.createElement('div');
						item = `<div class="bank_logo"><img src="assets/img/logos/${rut_banco}"></div>
								<div class="bank_description">${nom_banco}</div>
								<div class="bank_title">${tit_banco}</div>
								<div class="bank_doc">${doc_banco}: ${n_doc_banco}</div>
								<div class="bank_n">${n_banco}</div>
								<div class="bank_footer">
									<div class="bank_cuenta">${tip_banco}</div>
									<div class="bank_moneda">${mon_banco}</div>
								</div>`;
						bank_card.innerHTML = item;
						fragment.appendChild(bank_card);
				});
	
	showModal(fragment, data, addNode);

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

function preLoad(nodeNone){
	let $pre = document.querySelector('.pre-loader');
	let $container = document.querySelector(`.${nodeNone}`);
	if($pre) $pre.remove();
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
	try{
		let click = e.target.parentNode.className || null;
		let check = document.querySelector('input');

		if(click !== 'hamburguesa' && click !== 'nav-items'){
			check.checked = false;
		}
	}catch(e){
		return;
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

	let { id_banco, nom_banco, n_banco, tip_banco, mon_banco, rut_banco, tit_banco, doc_banco, n_doc_banco } = banco;
	(tip_banco == 0) ? tip_banco = 'Ahorro' : tip_banco = 'Corriente'; 
	(mon_banco == 0) ? mon_banco = 'Soles' : mon_banco = 'Dólares'; 
	let $div = document.createElement('div');

	$div.classList.add('bank_card');

	$div.innerHTML = `
					<div class="bank_logo"><img src="assets/img/logos/${rut_banco}"></div>
					<div class="bank_description">${nom_banco}</div>
					<div class="bank_title">${tit_banco}</div>
					<div class="bank_n">${n_banco}</div>
					<div class="bank_footer">
						<div class="bank_cuenta">${tip_banco}</div>
						<div class="bank_moneda">${mon_banco

						}</div>
					</div>
					<div class="bank_delete" id="btn-delete" data-id="${id_banco}">
						<span id="cupon"
					   data-bs-toggle="tooltip" 
					   title="Eliminar cuenta de banco."><i class="fa fa-trash" aria-hidden="true"></i></span>
					</div>
					
					
	`;
	
	contentBanck[1].appendChild($div);

}

function checkAdmin(){
	return new Promise(resolve => {
		firebase
			.auth()
			.onAuthStateChanged((user) => {
				if (!user) {
				    return location.href = '../login';
				}
			});
	})
}

function checkServer(){

	firebase.auth()
		.onAuthStateChanged(user => {

			if(!user) return;


			let key = user.uid;

			async () => {
				let query = await fetch(`Admin/check_admin/${key}`);
				let server = await query.json();

				server()
					.then(() => {
						if(!res) {
							location.href = '../Login';
						}
					})

			}
				// .then(res => res.json())
				// .then(res => {
				// 	if(!res) {
				// 		location.href = '../Login';
				// 	}
				// })	
		
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

	(tip_banco == 0) ? tip_banco = 'Ahorro' : tip_banco = "Corriente";
	(mon_banco == 0) ? mon_banco = 'Soles' : mon_banco = "Dólares";


	//Datos del banco del admin
	let queryBancoAdmin = await getBanco(ban_admin_operacion);
	let bancoAdmin = await queryBancoAdmin.json();
	let tip_bancoAdmin;
	let mon_bancoAdmin;
	(bancoAdmin[0].tip_banco == 0) ? tip_bancoAdmin = "Ahorro" : tip_bancoAdmin = "Corriente";
	(bancoAdmin[0].mon_banco == 0) ? mon_bancoAdmin = "Soles" : mon_bancoAdmin = "Dólares";

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
					    	<div class="ticket_items"><span class="fw-bold">Transferiste a:</span> ${bancoAdmin[0].nom_banco} - ${bancoAdmin[0].n_banco} - ${tip_bancoAdmin} - ${mon_bancoAdmin}</div>
					    	<div class="ticket_items"><span class="fw-bold">N° Operacion:</span> ${n_operacion}</div>
					    	
					    </div>
					    <div class="ticket_rigth">
					    	<div class="border">
					    		<div>Envías:</div>
					    		<div><span class="ticket_amount">${can_operacion}</div>
					    		<div>Recibes:</div>
					    		<div><span class="ticket_amount">${rec_operacion}</div>
					    		<div>Estado:</div>
					    		<div class="ticket_amount">${sta_operacion}</div>
					    	</div>
					    </div>
					  </div>`;

	swal($div);

	setTimeout(() => document.querySelector('.overlay').remove(), 50);
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

function showModal(modal, data, addNode){
	const divModal = document.createElement('div');
	const popup = document.createElement('div');
	popup.classList.add('popup');
	popup.innerHTML = `<h5>Seleccione el banco donde nos transfiere:</h5>`;
	divModal.classList.add('divModal');
	divModal.appendChild(popup);
	document.body.appendChild(divModal);
	popup.appendChild(modal);
	popup.innerHTML +=  `<button class="btn btn-secondary">Cerrar</button>`;

	document.querySelector('.btn-secondary').addEventListener('click', closePopup);
	addEventListener('click', e => {
		let nodo = e.target.classList[0];
		let idBank;

		if(nodo === 'bank_card') idBank = e.target.dataset.id;
		if(nodo === 'bank_description') idBank = e.target.parentNode.dataset.id;
		if(nodo === 'bank_title') idBank = e.target.parentNode.dataset.id;
		if(nodo === 'bank_doc') idBank = e.target.parentNode.dataset.id;
		if(nodo === 'bank_n') idBank = e.target.parentNode.dataset.id;
		if(nodo === 'bank_moneda') idBank = e.target.parentNode.parentNode.dataset.id;
		if(nodo === 'bank_cuenta') idBank = e.target.parentNode.parentNode.dataset.id;
		if(nodo === 'bank_footer') idBank = e.target.parentNode.dataset.id;
		if(typeof nodo === 'undefined') idBank = e.target.parentNode.parentNode.dataset.id;
		if(typeof idBank === 'undefined') return;

		addBack(idBank, data, addNode);
	});
}

function addBack(idBank, data, addNode){
	// const query = data.filter(b => b.id_banco === idBank);
	let query = [];
	data.forEach( b => {
		
		if(b.id_banco === idBank){
			query = [b];
		}

	})
	
	const bank_admin = document.getElementById(addNode);

	try{
		let { id_banco , rut_banco, nom_banco, n_banco, tip_banco, mon_banco, tit_banco, doc_banco, n_doc_banco } = query[0];

		(tip_banco == 0) ? tip_banco = 'Ahorro' : tip_banco = 'Corriente'; 
		(mon_banco == 0) ? mon_banco = 'Soles' : mon_banco = 'Dólares'; 

		bank_admin.children[0].classList.add('bank_select');
		bank_admin.dataset.id = id_banco;

		bank_admin.children[0].innerHTML = `
				<div class="bank_logo"><img src="assets/img/logos/${rut_banco}"></div>
				<div class="bank_description">${nom_banco}</div>
				<div class="bank_title">${tit_banco}</div>
				<div class="bank_doc">${doc_banco}: ${n_doc_banco}</div>
				<div class="bank_n">${n_banco}</div>
				<div class="bank_footer">
					<div class="bank_cuenta">${tip_banco}-</div>
					<div class="bank_moneda">${mon_banco}</div>
				</div>`;
		closePopup();
	}catch(e){
		return;
	}
	
}

function closePopup() {
	if(document.querySelector('.divModal')) document.querySelector('.divModal').remove();
}

function openLoad(){
	let $div = document.createElement('div');
	$div.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
	$div.classList.add('overlay');
	document.body.appendChild($div);
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
	checkCodigo,
	getBankAdmin,
	openLoad
};