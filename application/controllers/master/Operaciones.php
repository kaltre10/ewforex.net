<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operaciones extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('operaciones_model');
		$this->load->helper('get_id');
	}

	public function index()
	{

		$data = array(
			'nav' => $this->load->view('master/nav', "", true)
		);
		
		$this->load->view('master/Operaciones', $data);
	}

	public function operaciones($id)
	{

		$data = serialize($this->input->raw_input_stream);
		$data = explode('"', $data);
		$desde = $data[4] . " 00:00:00";
		$hasta = $data[8] . " 11:59:59";
		
		echo $this->operaciones_model->getOperaciones($id, $desde, $hasta);
	}

	public function check_admin($key){
		return get_id($key);
	}

	public function update_operacion(){
		$data = $this->input->raw_input_stream;
		$data =  explode('"', $data);
		$array = array(
			'id_operaciones' => $data[3],
			'sta_operacion' => $data[7]
		);

		$this->operaciones_model->statusOperacion($array);
		// echo json_encode($array);
	}

}