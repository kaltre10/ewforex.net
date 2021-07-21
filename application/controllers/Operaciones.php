<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operaciones extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('operaciones_model');
	}

	public function index()
	{

		$data = array(
			'nav' => $this->load->view('user/nav', "", true)
		);
		
		$this->load->view('user/Operaciones', $data);
	}

	public function operaciones()
	{
		$data = serialize($this->input->raw_input_stream);
		$data = explode('"', $data);
		$desde = $data[4] . " 00:00:00";
		$hasta = $data[8] . " 23:59:59";
		$id = $data[12];
	
		echo $this->operaciones_model->getOperaciones($desde, $hasta, $id);
	}

	public function operacionesAll()
	{
		$data = serialize($this->input->raw_input_stream);
		$data = explode('"', $data);
		$desde = $data[4] . " 00:00:00";
		$hasta = $data[8] . " 11:59:59";
		echo $this->operaciones_model->getOperacionesAll($desde, $hasta);
	}

	public function insertOperaciones()
	{
		$data = serialize($this->input->raw_input_stream);
		$data = explode('"', $data);

		$datos = array(
			'cot_operacion' => $data[50],
			'can_operacion' => $data[26],
			'rec_operacion' => $data[30],
			'n_operacion' => $data[46],
			'use_operacion' => $data[54],
			'sta_operacion' => 0,
			'ban_use_operacion' => $data[38],
			'ban_admin_operacion' => $data[42],
			'codigo_usuario' => $data[34]
		);

		// echo json_encode($datos);
		echo $this->operaciones_model->setOperaciones($datos);
	}

	public function getOperacion()
	{
		$data = serialize($this->input->raw_input_stream);
		$data = explode('"', $data);
		$id = $data[1];
		// echo json_encode($id);
		echo $this->operaciones_model->getOperacion($id);
	}

}