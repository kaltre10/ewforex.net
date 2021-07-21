<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<link rel="icon" href="<?= base_url('assets/img/icono.png'); ?>">
	<title>ewforex.net | Login</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
	<link rel="stylesheet" href="<?= base_url('assets/css/style.css'); ?>">	
	<link rel="stylesheet" href="<?= base_url('assets/css/not_found.css'); ?>">	
</head>
<body>
	<div class="pre-loader d-flex align-items-center justify-content-center">
		<div class="d-flex justify-content-center">
		  <div class="spinner-border" role="status">
		    <span class="visually-hidden">Loading...</span>
		  </div>
		</div>
	</div>
	<div class="found_container">
		<nav class="nav">
			<img class="logo-nav" src="<?= base_url('assets/img/logo_negro.png'); ?>" alt="">
		</nav>
		
		<div class="not_found">
			<div class="titulo"><span class="error">Error 404! 😫 </span><br>
			<span class="text">Lo sentimos! Esta pagina no existe.</span></div>
			<img src="<?= base_url('assets/img/not_found.png') ?>" alt="">
			<div class="btn">
				<a onclick="window.history.back();" class="btn-login">Volver</a>	
				<a href="<?= base_url('/.') ?>" class="btn-login">Login</a>
			</div>
		</div>
		
	</div>
	<script type="module" src="<?= base_url('assets/js/not_found.js'); ?>"></script>
</body>
</html>