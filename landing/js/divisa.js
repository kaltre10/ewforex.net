let $compra = document.getElementById('compra');
let $venta = document.getElementById('venta');
	$compra.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
	$venta.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;

// price();

async function price(){
	const query = await getPrice();
	const price = await query.json();
	const { com_divisa, ven_divisa } = price[0];
	$compra.textContent = com_divisa;
	$venta.textContent = ven_divisa;
}

function getPrice(){
	return fetch('http://localhost/appew/app-dolar/Divisas')
		   		.catch(error => console.error('Ha ocurrido un problema'));
}