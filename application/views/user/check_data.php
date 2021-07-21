<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="icon" href="<?= base_url('assets/img/icono.png'); ?>">
	<title>check data</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
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
			<h1>Compra y venta de dólares:</h1>
		</div>
		<div class="form">
			<div class="form-card">
				<div class="form-title">
					<div class="form-detail">
						<h6>Información de la operación: </h6>
						<span>Compra: <strong id="compra"></strong></span>
						<span>Venta <strong id="venta"></strong></span>
					</div>	
				</div>
				<div class="input mt-3">
					<strong>Cotizacion: </strong><span id="cotizacion"></span>
				</div>
				<div class="input">
					<strong>Envias: </strong><span id="envias"></span>
				</div>
				<div class="input">
					<strong>Recibes: </strong><span id="recibes"></span>
				</div>
				<div class="input">
					<strong>Desde: </strong><span id="bank_user"></span>
				</div>
				<div class="input">
					<strong>A: </strong><span id="bank_admin"></span>
				</div>
				<div class="input">
					<strong>N° operación: </strong><span id="n_operacion"></span>
				</div>
				<div class="input">
					<strong>Codigo: </strong><span id="codigo"></span>
				</div>
				<div class="input">
					<button id="btn" class="btn-form">Completar y finalizar <i class="fas fa-arrow-right"></i></button>
				</div>
				<div class="input form-help">
					<a href=""><i class="far fa-question-circle"></i> Necesitas ayuda?</a>
				</div>
			</div>
		</div>
	</div>
	<script type="module" src="assets/js/check_data.js"></script> 
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