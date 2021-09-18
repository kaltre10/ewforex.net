import { 
	closeSession,
	preLoad, 
	getUser,
	load,
	consultaPrecio,
	checkCodigo,
	getPrecio
} from './module.js';

let $btn = document.getElementById('btn');
let close = document.getElementById('close');

let objOperacion = {}

document.addEventListener("DOMContentLoaded", () => { getUser() });

let storage = getLocal(); //obtenemos datos de local storage

window.addEventListener('load', () =>{
	
	$btn.addEventListener('click', enviando);
	

	close.addEventListener('click', closeSession);

	consultaPrecio();

	//obteniendo datos del banco del usuario
	getDataBanco(storage['bankUser']).then(res => {
		let { nom_banco, n_banco, tip_banco, mon_banco } = res[0];
		(tip_banco == 0) ? tip_banco = "Ahorro" : tip_banco = "Corriente";
		(mon_banco == 0) ? mon_banco = "Soles" : mon_banco = "Dólares";
		objOperacion.desde = [ nom_banco, n_banco, tip_banco, mon_banco ];
	})
	.then(res => {
		getDataBanco(storage['bankAdmin']).then(res => {
		let { nom_banco, n_banco, tip_banco, mon_banco } = res[0];
		(tip_banco == 0) ? tip_banco = "Ahorro" : tip_banco = "Corriente";
		(mon_banco == 0) ? mon_banco = "Soles" : mon_banco = "Dólares";
		objOperacion.a = [ nom_banco, n_banco, tip_banco, mon_banco ];
		})
		.then(res => {
			let obj = getLocal();
			objOperacion = { ...objOperacion, obj }
			showData();
		})
	})
	.then(() => preLoad('container-home'));

})

async function showData(){

	

	let cotizacion = await getCotizacion(storage['codigo_usuario']);
	document.getElementById('cotizacion').textContent = cotizacion;
	document.getElementById('envias').textContent = storage['envias'];
	document.getElementById('recibes').textContent = storage['recibes'];
	document.getElementById('bank_user').textContent = objOperacion.desde;
	document.getElementById('bank_admin').textContent = objOperacion.a;
	document.getElementById('n_operacion').textContent = storage['n_operacion'];
	document.getElementById('codigo').textContent = storage['codigo_usuario'];
	
	objOperacion = { ...objOperacion, cotizacion }

}

function getLocal(){
	let obj = JSON.parse(localStorage.getItem('operacion'));
	return obj;
}

function clearLocal(){
	localStorage.clear();
}

function enviando(){
	guardarOperacion();
	clearLocal();
	loadBtn();
}

function loadBtn(){
	$btn.innerHTML = `
					  <span class="spinner-border" role="status">
					  </span>
					`;
	$btn.disabled = true;
}

async function guardarOperacion(){
	await validarOperacion();
	insertOperacion();
	await swal("Muy Bien!", "Su orden se ha guardado exitosamente!", "success");
	location.href = 'Operaciones';
}

function validarOperacion(){
	// console.log('validando...');
}

async function getDataBanco(id){

	let consulta = await fetch('Bancos/getBancoId', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: id
	})
	.then(res => res.json())
	.then(res => res)
	return consulta;
}

function insertOperacion(){

	firebase
		.auth()
		.onAuthStateChanged((user) => {
			if (user) {
			    let uid = user.uid;
			    objOperacion = { ...objOperacion, uid };

			    fetch('Operaciones/insertOperaciones', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(objOperacion),
				})
				// .then(res => res.json())
				// .then(res => console.log(res))
			    
			}else {
				location.href = 'login';
		  	}

	})
}

async function getCotizacion(codigo){

	//obteniendo cotizacion del dolar
	let queryPrecio = await getPrecio();
	let precio = await queryPrecio.json();

	if(codigo == 'No aplica'){
		if(storage['tipo'] == 'COMPRA'){
			return (parseFloat(storage['recibes']) / parseFloat(storage['envias'])).toFixed(2);
		}else{
			return precio[0].ven_divisa;
		}
	}
	
	//obteniendo codigo
	let querycodigos = await checkCodigo();
	let getCodigos = await querycodigos.json();
	let arrayCodigos = JSON.parse(getCodigos);
	
	let getCodigo = arrayCodigos.filter( c => c.num_codigo == codigo && storage['tipo'] == c.tip_codigo);
	if(getCodigo.length > 0){
		return getCodigo[0].cot_codigo;
	}
	
	if(storage['tipo'] == 'COMPRA'){
		return precio[0].com_divisa;
	}else{
		return precio[0].ven_divisa;
	}

}