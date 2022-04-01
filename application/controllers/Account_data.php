<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Account_data extends CI_Controller {

	public function index()
	{
		$data = array(
			'nav' => $this->load->view('user/nav', "", true)
		);
		
		$this->load->view('user/Account_data', $data);
	}

}