<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>
<img class="logo-nav" src="<?= base_url('assets/img/logo_negro.png'); ?>" alt="">
<div class="hamburguesa">
	<!-- <div class="bars"> -->
		<input type="checkbox">
		<i class="fas fa-bars"></i>
		<i class="fas fa-times"></i>
	<!-- </div> -->

	<nav class="nav">
		<ul class="nav-items">
			<li><a href="<?= base_url('./Admin'); ?>"><i class="fas fa-hand-holding-usd mx-2"></i> Compra  / Venta</a></li>
			<li><a href="<?= base_url('Datos'); ?>"><i class="fas fa-digital-tachograph mx-2"></i>Datos personales</a></li>
			<li><a href="<?= base_url('Operaciones'); ?>"><i class="fas fa-clipboard mx-2"></i>Operaciones</a></li>
			<li><a href="#" id="close"><i class="fas fa-sign-out-alt mx-2"></i>Salir</a></li>
		</ul>
	</nav>
</div>
