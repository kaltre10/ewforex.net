<?php

class Divisas_model extends CI_Model {

	public function getDivisas()
	{
		$divisas = $this->db->get('divisas');
		return json_encode($divisas->result());
	}

	public function setDivisas($divisas)
	{
		// echo json_encode($divisas['divisa']);
		$this->db->set('com_divisa', $divisas['com_divisa']);
		$this->db->set('ven_divisa', $divisas['ven_divisa']);
		$this->db->where('cod_divisa', $divisas['cod_divisa']);
		$this->db->update('divisas', $divisas);
	}

}