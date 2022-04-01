<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

	public function index()
	{
		$data = array(
			'nav' => $this->load->view('user/nav', "", true)
		);
		
		$this->load->view('user/Admin', $data);
	}

}