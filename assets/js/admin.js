
import { 
	closeSession, 
	alert, 
	preLoad, 
	getUser, 
	loadBtn, 
	closeWindow, 
	load,
	consultaPrecio,
	getKey,
} from './module.js';

document.addEventListener("DOMContentLoaded", () => { getUser() });

let operacion = 'venta';
let	$enviasText = document.getElementById('enviasText');
let $recibesText = document.getElementById('recibesText');
let	$envias = document.getElementById('envias');
let $recibes = document.getElementById('recibes');

let objOperacion = {};
let precio;
let numCodigo = 'No aplica';
let datosPersonales = [];

let $compra = document.getElementById('compra').parentNode;
let $venta = document.getElementById('venta').parentNode;

window.addEventListener('load', async () => {

	//preload para el precio
	load();

	consultaPrecio();

	let $btn = document.getElementById('btn');
	let cupon = document.getElementById('cupon');
	let codigo = document.getElementById('codigo');
	let close = document.getElementById('close');
	let exchange = document.getElementById('exchange');

	cupon.addEventListener('click', addCodigo);
	close.addEventListener('click', closeSession);
	exchange.addEventListener('click', () => {
		exchangeButton(operacion)
	});

	//si da click a compra o venta arriba del formulario
	$compra.addEventListener('click', e => exchangeButton('venta'));
	$venta.addEventListener('click', e => exchangeButton('compra'));

	$envias.addEventListener('input', calcularCompra);
	$recibes.addEventListener('input', calcularVenta);
	$btn.addEventListener('click', enviando);

	document.addEventListener('click', e => {
		closeWindow(e);	
	});

	exchangeButton('venta');

	//verificar si hay datos personales completos
	consultarDatos()

});



function addCodigo(e){
	e.preventDefault();
	swal({
	  text: 'Ingrese el codigo:',
	  content: "input",
	  button: {
	    text: "Agregar",
	    closeModal: false,
	  },
	})
	.then(results => {
		if (results !== '' && results !== null){
			consultarCodigo(results);
		}else{
			swal({
			 	title: "Codigo no está disponible!",
			 	icon: "error"
			 })
		} 
	})
	.catch(err => {
	  if (err) {
	    swal({
			title: "Codigo no está disponible!",
			icon: "error"
		})
	  } else {
	    swal.stopLoading();
	    swal.close();
	  }
	});
}

/*la varible "operacion" de la funcion se coloca con "$" -> "$operacion"
para no afectar la varibale operacion global */
function exchangeButton($operacion){ 
	if($operacion == 'compra'){
		exchange.style.transform = 'rotate(170deg)';
		$enviasText.textContent = 'Soles';
		$recibesText.textContent = 'Dólares';
		$recibes.value = (parseFloat(Number($envias.value)) / venta.innerText).toFixed(2);
		operacion = 'venta';
		objOperacion.tipo = "VENTA";

		//ajustar estilos al head de precios
		$venta.classList.add("tipo-operacion-active");
		$compra.classList.remove("tipo-operacion-active");
	}else{
		exchange.style.transform = 'rotate(-120deg)';
		$enviasText.textContent = 'Dólares';
		$recibesText.textContent = 'Soles';
		$recibes.value = (parseFloat(Number($envias.value)) * Number(compra.innerText)).toFixed(2);
		operacion = 'compra';
		objOperacion.tipo = "COMPRA";

		//ajustar estilos al head de precios
		$venta.classList.remove("tipo-operacion-active");
		$compra.classList.add("tipo-operacion-active");
	}

}

function calcularCompra(){

	if(operacion == 'compra'){
		$recibes.value = (parseFloat(Number($envias.value)) * compra.innerText).toFixed(2);
	}else{
		$recibes.value = (parseFloat(Number($envias.value)) / venta.innerText).toFixed(2);
	}

}

function calcularVenta(){

	if(operacion == 'venta'){
		$envias.value = (parseFloat(Number($recibes.value)) * venta.innerText).toFixed(2);
	}else{
		$envias.value = (parseFloat(Number($recibes.value)) / compra.innerText).toFixed(2);
	}
	
}

function addLocal(operacion){
	localStorage.setItem('operacion', JSON.stringify(operacion));
}

async function enviando(){

	consultarDatos();
 	
	if(!datosPersonales[0]) return alert("Por favor ingrese al menu en Datos Personales y agregue su información antes de realizar un cambio.", "danger", document.getElementById('form'));

	if(Number($envias.value) == 0)
		 return alert('Ingrese Valores Validos', 'danger', document.getElementById('form'));

		let obj = { ...objOperacion, 
			'envias': `${$envias.value} ${$enviasText.textContent}`, 
			'recibes': `${$recibes.value} ${$recibesText.textContent}`,
			'codigo_usuario': numCodigo, 
		};

		addLocal(obj);
		loadBtn();
		location.href = 'account_data';
}

function consultarCodigo(inputCodigo){
	fetch('master/Codigo/getCodigos')
		.then(res => res.json())
		.then(res => {
			const codigos = JSON.parse(res);

			const codigo = codigos.filter( cod => inputCodigo == cod.num_codigo);

			if(codigo.length > 0){

				let { tip_codigo, cot_codigo, num_codigo } = codigo[0];

				if(tip_codigo == 'COMPRA'){
					 
					operacion = 'venta';
					document.getElementById('compra').textContent = cot_codigo
				}else{
					operacion = 'compra';
					document.getElementById('venta').textContent = cot_codigo
				}

				//asignamos el codigo a la variable global numCodigo
				numCodigo = inputCodigo;

				//Realizamos calculo
				exchangeButton(operacion);

				//modificamos el texto con el codigo agregado
				document.getElementById('codigo').textContent = ": " + inputCodigo;

				// document.getElementById('codigo').textContent = num_codigo;
				swal({
			 		title: "Codigo agregado!",
			 		icon: "success"
				});

			}else{
				swal({
			 		title: "Codigo no está disponible!",
			 		icon: "error"
			 	})
			}
		})
}

function consultarDatos(){

	firebase
		.auth()
		.onAuthStateChanged(user => { 
			if (user) {
				if(!user.emailVerified) return location.href = "Verifique";

				fetch(`Usuarios/usuario/${user.uid}`)
					.then(res => res.json())
					.then(res => {
						const { nom_user, n_user} = res[0];
						if( nom_user === null || n_user === null){
							datosPersonales[0] = false;
						}else{
							datosPersonales[0] = true;
						}
					})
					.then(() => preLoad('container-home'))
					// .catch( error => console.error( error ))
			}
		});
}