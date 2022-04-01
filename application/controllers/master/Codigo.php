<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Codigo extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('codigo_model');
		$this->load->helper('get_id');
	}

	public function index()
	{

		$data = array(
			'nav' => $this->load->view('master/nav', "", true)
		);
		
		$this->load->view('master/Codigo', $data);
	}

	public function getCodigos()
	{	

		echo json_encode($this->codigo_model->getCodigos());
	}

	public function deleteCodigo(){

		$id = $this->input->raw_input_stream;
		$id_clean = preg_replace('/(^[\"\']|[\"\']$)/', '', $id);
		$this->codigo_model->deleteCodigo($id_clean);

	}

	public function addCodigo(){
		$data = $this->input->raw_input_stream;
		$array = explode('"', $data);
		$datos = array(
			'num_codigo' => $array[3],
			'cot_codigo' => $array[7],
			'tip_codigo' => $array[11]
		);
		$this->codigo_model->addCodigo($datos);
	}

	public function check_admin($key){
		return get_id($key);
	}

}