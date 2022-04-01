<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="icon" href="<?= base_url('assets/img/icono.png'); ?>">
	<title>ewforex.net | Registro</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
	<link rel="stylesheet" href="<?= base_url('assets/css/style.css'); ?>">	
</head>
<body>
	<div class="pre-loader d-flex align-items-center justify-content-center">
		<div class="d-flex justify-content-center">
		  <div class="spinner-border" role="status">
		    <span class="visually-hidden">Loading...</span>
		  </div>
		</div>
	</div>
	<div class="login-container">
		<nav class="nav">
			<img class="logo-nav" src="<?= base_url('assets/img/logo_negro.png'); ?>" alt="">
			<ul>
				<li><a href="#">Inicio</a></li>
				<li><a href="#">Blog</a></li>
				<li class="btn-login"><a href="#">Login</a></li>
			</ul>
		</nav>
		<div class="form">
			<div class="form-card">
				<h1>Registro de Cuenta: </h1>
				<form id="form">
					<div id="correo">
						<label>Correo</label>
						<input id="email" type="mail" name="correo" autocomplete="off" autofocus>
					</div>
					<div id="password">
						<label>Contraseña</label>
						<input id="pas" type="password" name="password" autocomplete="off">
					</div>
					<div id="check_password">
						<label>Verificar Contraseña</label>
						<input id="check_pas" type="password" name="check_password" autocomplete="off">
					</div>
					<button id="btn" class="btn-form">Registrar</button>
				</form>
				<a href="<?= base_url('Login'); ?>">Ya tengo cuenta</a>
			</div>
		</div>
	</div>
	<script type="module" src="assets/js/login/sign.js"></script>
	<script src="<?= base_url('assets/js/login/functions.js'); ?>"></script>
  	
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