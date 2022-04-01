<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Divisas extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('divisas_model');
		$this->load->helper('get_id');
	}

	public function index()
	{

		$data = array(
			'nav' => $this->load->view('master/nav', "", true)
		);
		
		$this->load->view('master/Divisas', $data);
	}

	public function getDivisas()
	{	

		echo json_encode($this->divisas_model->getdivisas());
	}

	public function setdivisas(){
		$data = $this->input->raw_input_stream;
		$array = explode('"', $data);
		$datos = array(
			'cod_divisa' => "USD",
			'com_divisa' => $array[3],
			'ven_divisa' => $array[7]
		);
		// echo json_encode($datos);
		$this->divisas_model->setDivisas($datos);
	}

	public function setdivisasEur(){
		$data = $this->input->raw_input_stream;
		$array = explode('"', $data);
		$datos = array(
			'cod_divisa' => "EUR",
			'com_divisa' => $array[3],
			'ven_divisa' => $array[7]
		);
		// echo json_encode($datos);
		$this->divisas_model->setDivisas($datos);
	}

	public function check_admin($key){
		return get_id($key);
	}

}