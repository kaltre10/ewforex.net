<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bancos extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('bancos_model');
	}

	public function index()
	{
		echo $this->bancos_model->getBancos();
	}

	public function insertBanco()
	{
		$string = $this->input->raw_input_stream;
		$array = explode('"', $string);
		$datos = array(
			'nom_banco' => $array[3],
			'rut_banco' => $array[3].".png",
			'n_banco' => $array[7],
			'tip_banco' => $array[11],
			'mon_banco' => $array[15],
			'tit_banco' =>  $array[19],
			'doc_banco' =>  $array[23],
			'n_doc_banco' => $array[27],
			'use_banco' => $array[31]
		);
		// echo json_encode($datos);
		$this->bancos_model->addBanco($datos);
	}


	public function deleteBanco()
	{

		$id = $this->input->raw_input_stream;
		$id_clean = preg_replace('/(^[\"\']|[\"\']$)/', '', $id);
		$this->bancos_model->deleteBanco($id_clean);

	}

	public function getBancosAdmin()
	{
		echo $this->bancos_model->getBancosAdmin();
	}

	public function getBancoId()
	{
		$id = $this->input->raw_input_stream;
		// echo json_encode($id);
		echo $this->bancos_model->getBancoId($id);
	}

}