<?php

function get_id($key){
	
	$CI =& get_instance();
	$CI->load->model('usuarios_model');
	$user = $CI->usuarios_model->getUsuario($key);
	$array = explode( '"', $user );

	if($array[3] == 1){
		$result = true;
	}else{
		$result = false;
	}
	return json_encode($result);
}