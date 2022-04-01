<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Divisas extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('divisas_model');
	}

	public function index()
	{
		echo $this->divisas_model->getDivisas();
	}

	public function update($id, $compra, $venta)
	{
		$divisas = array(
			'id_divisa' => $id,
			'com_divisa' => $compra,
			'ven_divisa' => $venta 
		);
		$this->divisas_model->updateDivisas($divisas);
	}

}