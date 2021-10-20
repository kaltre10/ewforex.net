<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuarios extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('usuarios_model');
	}

	public function getAdmin()
	{
		echo $this->usuarios_model->getAdmin();
	}

	public function usuario($key_usuario)
	{
		echo $this->usuarios_model->getUsuario($key_usuario);
	}

	public function getUsuarios()
	{
		echo $this->usuarios_model->getUsuarios();
	}

	public function insertUsuario()
	{
		$data = $this->input->raw_input_stream;
		$array = explode('"', $data);

		$datos = array(
			'user' => $array[3],
			'email' => $array[7]
		); 
		// echo json_encode($array);
		echo $this->usuarios_model->insertUsuario($datos);
	}

	public function editUsuario(){
		$data = $this->input->raw_input_stream;
		$array = explode('"', $data);
		$key = $array[3];
		$value = $array[7];
		$input = $array[11];

		if(count($array) > 13){
			$inputAux = $array[15];
			$valueAux = $array[19];
		}
		
		$this->usuarios_model->editUsuario($key, $value, $input, $inputAux, $valueAux);
	}

}