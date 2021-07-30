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
			<li><a href="<?= base_url('./Admin'); ?>">Compra  / Venta</a></li>
			<li><a href="<?= base_url('Datos'); ?>">Datos personales</a></li>
			<li><a href="<?= base_url('Operaciones'); ?>">Operaciones</a></li>
			<li><a href="#" id="close">Salir</a></li>
		</ul>
	</nav>
</div>
