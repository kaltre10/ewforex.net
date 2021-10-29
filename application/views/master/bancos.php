<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>ewforex.net</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<link rel="stylesheet" href="<?= base_url('assets/css/user.css'); ?>">	
	<link rel="stylesheet" href="<?= base_url('assets/css/master/bancos.css'); ?>">	
</head>
<body>
	<div class="pre-loader d-flex align-items-center justify-content-center">
		<div class="d-flex justify-content-center">
		  <div class="spinner-border" role="status">
		    <span class="visually-hidden">Loading...</span>
		  </div>
		</div>
	</div>
	<div class="container-bancos">
		<?= $nav; ?>
		<div class="header">
			<h1>Bancos:</h1>
		</div>
		<div class="banco-row">
			<form class="mt-3">
				<div class="col-auto">
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
				<div class="col-auto">
					<label>Número de cuenta:</label>
					<input id="swal-input2" class="swal2-input" type="number">
				</div>
				<div class="col-auto">
					<label>Tipo de cuenta:</label>
					<select id="swal-input3" class="swal2-input">
						<option value=""> - Seleccione - </option>
						<option value="0">Ahorro</option>
						<option value="1">Corriente</option>
					</select>
				</div>
				<div class="col-auto">
					<label>Moneda:</label>
					<select id="swal-input4" class="swal2-input">
						<option value=""> - Seleccione - </option>
						<option value="0">Soles</option>
						<option value="1">Dólares</option>
					</select>
				</div>
				<div class="col-auto">
					<label>Nombre del Titular / Razón Social:</label>
					<input id="swal-input5" type="text" class="swal2-input" placeholder="Nombre del Titular / Razón Social">
				</div>
				<div class="col-auto">
					<label>Tipo de Documento:</label>
					<select id="swal-input6" class="swal2-input">
						<option value=""> - Seleccione - </option>
						<option value="DNI">DNI</option>
						<option value="PASS">Pasaporte</option>
						<option value="CE">Carnet de Extranjería</option>
						<option value="RUC">RUC</option>
					</select>
				</div>
				<div class="col-auto">
					<label>Número de Documento:</label>
				 	<input id="swal-input7" type="text" class="swal2-input" placeholder="Número de Documento">
				</div>
				<div class="col-auto">
					<button id="submit" class="btn">Registrar</button>
				</div>
			</form>
		</div>
		<div class="bancos"></div>
	</div>
  	
	<!-- The core Firebase JS SDK is always required and must be listed first -->
	<script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js"></script>

	<!-- TODO: Add SDKs for Firebase products that you want to use
	     https://firebase.google.com/docs/web/setup#available-libraries -->
	<script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-analytics.js"></script>

	<!-- Add Firebase products that you want to use -->
  	<script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-auth.js"></script>
  	<script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-firestore.js"></script>
	<script src="<?= base_url('assets/js/config-firebase.js'); ?>"></script>
	<script type="module" src="<?= base_url('assets/js/master/bancos.js'); ?>"></script>

</body>
</html>