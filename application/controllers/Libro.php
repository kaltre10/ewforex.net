<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Libro extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->library('email');
	}

	public function index()
	{
		$data = serialize($this->input->raw_input_stream);
		$data = explode('"', $data);
		$datos =  array(
			"nombre" => $data[4],
			"apellido" => $data[8],
			"documento" => $data[12],
			"n_documento" => $data[16],
			"correo" => $data[20],
			"tel" => $data[24],
			"detalle" => $data[28],
		);
		// $this->sendEmail($datos);
		echo json_encode($datos);
	}

	public function sendEmail($datos)
	{

		$detalle = "Nombre: $datos[nombre] $datos[apellido] \nDocumento: $datos[documento] $datos[n_documento]\nTelefono: $datos[tel]\n\n$datos[detalle]";

		$this->load->library('email');

		$this->email->from($datos['correo'], "$datos[nombre] $datos[apellido]");
		$this->email->to('bitmarketperu@gmail.com');
		$this->email->cc('bitmarketperu@gmail.com');
		$this->email->bcc('bitmarketperu@gmail.com');

		$this->email->subject('Libro de Reclamaciones');
		$this->email->message($detalle);

		$this->email->send();
		// echo json_encode($detalle);
	}

}

