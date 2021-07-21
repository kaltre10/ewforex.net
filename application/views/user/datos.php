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
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10.15.5/dist/sweetalert2.all.min.js"></script>
	<link rel="stylesheet" href="<?= base_url('assets/css/user.css'); ?>">	
	<link rel="stylesheet" href="<?= base_url('assets/css/datos.css'); ?>">
</head>
<body>
	<div class="pre-loader d-flex align-items-center justify-content-center">
		<div class="d-flex justify-content-center">
		  <div class="spinner-border" role="status">
		    <span class="visually-hidden">Loading...</span>
		  </div>
		</div>
	</div>
	<div class="container-datos">
		<?= $nav; ?>
		<div class="header">
			<h1>Datos Personales:</h1>
		</div>
		<div class="datos">
			<div class="bank_header m-2 text-center">
				<h5 class="">Datos personales:</h5>
			</div>
			<div class="form-card">
				<!-- <div class="input">
					<div class="input-item">
						<span><i class="fas fa-user"></i></span>
						<span> Jason Hernandez</span>
					</div>	
				</div>
				<div class="input">
					<div class="input-item">
						<span><i class="fas fa-envelope-open"></i></span>
						<span> kaltre10@gmail.com</span>
					</div>	
				</div>
				<div class="input">
					<div class="input-item">
						<span><i class="fas fa-id-card"></i></span>
						<span>DNI 149889214</span>
					</div>
				</div> -->
			</div>
		</div>
		<div class="bank">
			<div class="bank_header m-2">
				<h5>Cuentas de banco:</h5>
				<button class="btn btn-primary swal-button" id="btn"><i class="fa fa-plus-circle" aria-hidden="true"></i> Agregar banco</button>
			</div>
			<div class="form-card">
				<!-- <div class="bank_card">
					<div class="bank_logo"><img src="<?= base_url('assets/img/logos/interbank.png'); ?>" alt=""></div>
					<div class="bank_description">Banco Personal</div>
					<div class="bank_title">INTERBANK</div>
					<div class="bank_n">13345535455</div>
					<div class="bank_footer">
						<div class="bank_cuenta">Ahorro</div>
						<div class="bank_moneda">Soles</div>
					</div>
					<div class="bank_delete"><div class="bank_delete" id="btn-delete"><i class="fa fa-trash" aria-hidden="true"></i></div></div>
				</div> -->
				
			</div>

		</div>
	</div>
  	<script type="module" src="assets/js/datos.js"></script>
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