<?php

class Usuarios_model extends CI_Model {

	// public function getAdmin($id)
	// {
	// 	$usuario = $this->db->get_where('usuarios', array('id_user' => 1), 1);
	// 	return json_encode($usuario->result());
	// }

	public function getUsuario($key_usuario)
	{
		$usuario = $this->db->get_where('usuarios', array('user' => $key_usuario), 1);
		return json_encode($usuario->result());
	}

	public function insertUsuario($user)
	{
		$this->db->insert('usuarios', $user);
	}


	public function getUsuarios()
	{
		$query = $this->db->get('usuarios');
		return json_encode($query->result());
	}


	public function editUsuario($key, $value, $input, $inputAux, $valueAux)
	{
		
		$data = array(
	        $input => $value,
		);

		if($inputAux && $valueAux){
			$data[$inputAux] = $valueAux;
		}

		// echo json_encode($data);
		$this->db->where("user", $key);
		$this->db->update('usuarios', $data);
	}

}