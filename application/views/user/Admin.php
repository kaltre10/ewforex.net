<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="icon" href="<?= base_url('assets/img/icono.png'); ?>">
	<title>ewforex.net</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet"> -->
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
	<link rel="stylesheet" href="<?= base_url('assets/css/user.css'); ?>">
</head>
<body>
	<div class="pre-loader d-flex align-items-center justify-content-center">
		<div class="d-flex justify-content-center">
		  <div class="spinner-border" role="status">
		    <span class="visually-hidden">Loading...</span>
		  </div>
		</div>
	</div>
	<div class="container-home">
		<?= $nav; ?>
		<div class="header">
			<h1>Compra y Venta de Dólares:</h1>
		</div>
		<div class="form">
			<div class="form-card" id="form">
				<div class="form-title">
					<div class="form-detail">
						<h6>Registre su operacion: </h6>
						<span>Compra: <strong id="compra"></strong></span>
						<span>Venta: <strong id="venta"></strong></span>
					</div>	
				</div>
				<div class="input">
					<label>Envias: <strong id="enviasText"></strong></label>
					<input id="envias" type="number" min="1" name="" autocomplete="off">
				</div>
				<div class="btc-exchange">
					<i class="fas fa-sync-alt"
					   data-bs-toggle="tooltip" 
					   title="Clic para cambiar las monedas."
					 id="exchange"></i>
				</div>
				<div class="input">
					<label>Recibes: <strong id="recibesText"></strong></label>
					<input id="recibes" type="number" name="" autocomplete="off">
				</div>
				<div class="input form-help">
					<a id="cupon"
					   data-bs-toggle="tooltip" 
					   title="Puede consultar por chat si hay disponible un codigo para mejorar el tipo de cambio."><i class="fas fa-ticket-alt"></i> Tengo un codigo</a><span id="codigo"></span>
				</div>
				<div class="input">
					<button id="btn" class="btn-form">Continuar <i class="fas fa-arrow-right"></i></button>
				</div>
				<div class="input form-help">
					<a data-bs-toggle="tooltip" 
					   title="Si necesitas ayuda o tienes alguna duda por favor escribanos a nuestro chat para ayudarle">
					<i class="far fa-question-circle"></i> Necesitas ayuda?</a>
				</div>
			</div>
		</div>
	</div>
	<!-- Bootstrap JS -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

	<script type="text/javascript">
		let tooltipTriggerList = []
				.slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
		let tooltipList = tooltipTriggerList
				.map(function (tooltipTriggerEl) {
		 		return new bootstrap.Tooltip(tooltipTriggerEl)
			})
	</script>

	<script type="module" src="assets/js/admin.js"></script>	
	<!-- The core Firebase JS SDK is always required and must be listed first -->
	<script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js"></script>
	<!-- TODO: Add SDKs for Firebase products that you want to use
	     https://firebase.google.com/docs/web/setup#available-libraries -->
	<script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-analytics.js"></script>
	<!-- Add Firebase products that you want to use -->
  	<script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-auth.js"></script>
  	<script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-firestore.js"></script>
	<script src="<?= base_url('assets/js/config-firebase.js'); ?>"></script>
</body>
</html>