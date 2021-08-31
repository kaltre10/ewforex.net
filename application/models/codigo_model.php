<?php

class Codigo_model extends CI_Model {

	public function addCodigo($datos)
	{
		$this->db->insert('codigo', $datos);
	}

	public function getCodigo($codigo) 
	{
		$sql = $this->db->where('num_codigo', $codigo);
		$sql = $this->db->get('codigo');
 		return json_encode($sql->result());
	}

	public function getCodigos() 
	{
		$sql = $this->db->get('codigo');
 		return json_encode($sql->result());
	}

	public function deleteCodigo($id)
	{
		// echo json_encode($id);
		$this->db->where('id_codigo', $id);
		$this->db->delete('codigo');
	}
}