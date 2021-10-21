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
		$hasta = $data[8] . " 23:59:59";
		echo $this->operaciones_model->getOperacionesAll($desde, $hasta);
	}

	public function insertOperaciones()
	{
		$data = serialize($this->input->raw_input_stream);
		$data = explode('"', $data);

		$datos = array(
			'tip_operacion' => $data[4],
			'cot_operacion' => $data[32],
			'can_operacion' => $data[8],
			'rec_operacion' => $data[12],
			'n_operacion' => $data[28],
			'use_operacion' => $data[36],
			'sta_operacion' => 0,
			'ban_use_operacion' => $data[20],
			'ban_admin_operacion' => $data[24],
			'codigo_usuario' => $data[16],
			'fec_operacion' => date("Y-m-d H:i")
		);

		// echo json_encode($datos);
		// echo $this->operaciones_model->setOperaciones($datos);
		$this->operaciones_model->setOperaciones($datos);
		$this->sendEmail();
	}

	public function getOperacion()
	{
		$data = serialize($this->input->raw_input_stream);
		$data = explode('"', $data);
		$id = $data[1];
		echo $this->operaciones_model->getOperacion($id);
	}

	public function sendEmail()
	{

		$this->load->library('email');
		$this->email->from('ewforex.net');
		$this->email->to('bitmarketperu@gmail.com');
		$this->email->cc('bitmarketperu@gmail.com');
		$this->email->bcc('bitmarketperu@gmail.com');
		$this->email->subject('Nueva Operacion en ewforex.net');
		$this->email->message('Se ha registrado una nueva operacion en ewforex.net!');
		$this->email->send();

	}

}

