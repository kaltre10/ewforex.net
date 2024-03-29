<?php

class Bancos_model extends CI_Model {

	public function getBancosAdmin()
	{
		$bancos = $this->db->query('select * from bancos as b inner join usuarios as u on b.use_banco = u.user where u.id_user = 1');
		return json_encode($bancos->result());
	}

	public function getbancos()
	{
		// $bancos = $this->db->get('bancos');
		$bancos = $this->db->select('*')->from('bancos')
						                ->where('sta_banco !=', 1)
										->get();
		return json_encode($bancos->result());
	}

	public function addBanco($datos)
	{
		$this->db->insert('bancos', $datos);
	}

	public function getBancoId($id)
	{
		$banco = $this->db->get_where('bancos', array('id_banco' => $id));
		return json_encode($banco->result());
	}

	public function deleteBanco($id)
	{
		//$this->db->delete('bancos', array('id_banco' => $id));
		$this->db->set('sta_banco', 1, FALSE);
		$this->db->where('id_banco', $id);
		$this->db->update('bancos');

	}

}