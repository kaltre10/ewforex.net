<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bancos extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('bancos_model');
		$this->load->helper('get_id');
	}

	public function index()
	{

		$data = array(
			'nav' => $this->load->view('master/nav', "", true)
		);
		
		$this->load->view('master/Bancos', $data);
	}

	public function getBancos()
	{	
		echo json_encode($this->bancos_model->getBancos());
	}

	public function getBancosAdmin()
	{	
		echo json_encode($this->bancos_model->getBancosAdmin());
	}

	public function deleteBanco(){
		$id = $this->input->raw_input_stream;
		$id_clean = preg_replace('/(^[\"\']|[\"\']$)/', '', $id);
		$this->bancos_model->deleteBanco($id_clean);
	}

	public function addBanco(){
		$data = $this->input->raw_input_stream;
		$array = explode('"', $data);
		$datos = array(
			'nom_banco' => $array[3],
			'n_banco' => $array[7],
			'tip_banco' => $array[11],
			'mon_banco' => $array[15]
		);
		// echo json_encode($array);
		$this->bancos_model->addBanco($datos);
	}

	public function check_admin($key){
		return get_id($key);
	}

}