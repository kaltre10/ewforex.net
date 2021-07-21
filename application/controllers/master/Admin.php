<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('get_id');
	}

	public function index()
	{

		$data = array(
		'nav' => $this->load->view('master/nav', "", true)
		);
	
		$this->load->view('master/Admin', $data);

	}

	public function check_admin($key){
		return get_id($key);
	}

}