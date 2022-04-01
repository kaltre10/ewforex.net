<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Check_data extends CI_Controller {

	public function index()
	{
		$data = array(
			'nav' => $this->load->view('user/nav', "", true)
		);
		$this->load->view('user/Check_data', $data);
	}

}