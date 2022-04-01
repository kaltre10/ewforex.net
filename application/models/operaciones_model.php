<?php

class Operaciones_model extends CI_Model {

	// public function getOperaciones()
	// {
	// 	$operaciones = $this->db->get('operaciones');
	// 	return json_encode($operaciones->result());
	// }

	public function getOperacion($id_operacion)
	{
		// $query = $this->db->get_where('operaciones', array('id_operaciones' => $id_operacion));

		$query = $this->db->query("select * from operaciones as o inner join usuarios as u on o.use_operacion = u.user where o.id_operaciones = $id_operacion");

		return json_encode($query->result());
	}

	public function setOperaciones($operacion)
	{
		$this->db->insert('operaciones', $operacion);
	}

	public function getOperaciones($desde, $hasta, $id) 
	{
		$this->db->order_by('id_operaciones', 'DESC');
		$sql = $this->db->where('use_operacion', $id);
		$sql = $this->db->where("fec_operacion BETWEEN '$desde' AND '$hasta'");
		$sql = $this->db->get('operaciones');
 		return json_encode($sql->result());
	}

	public function getOperacionesAll($desde, $hasta) 
	{
		$sql = $this->db->where("fec_operacion BETWEEN '$desde' AND '$hasta'");
		$sql = $this->db->get('operaciones');
 		return json_encode($sql->result());
	}

	public function statusOperacion($status) 
	{
		// echo json_encode();
		$this->db->set('sta_operacion', $status['sta_operacion']);
		$this->db->where('id_operaciones', $status['id_operaciones']);
		$this->db->update('operaciones'); 
	}

}