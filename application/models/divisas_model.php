<?php

class divisas_model extends CI_Model {

	public function getDivisas()
	{
		$divisas = $this->db->get('divisas');
		return json_encode($divisas->result());
	}

	public function setDivisas($divisas)
	{
		$this->db->set('com_divisa', $divisas['com_divisa']);
		$this->db->set('ven_divisa', $divisas['ven_divisa']);
		$this->db->update('divisas', $divisas);
	}

}