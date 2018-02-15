<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/RestService.php');

class Home extends RestService {

	function __construct() {
		parent::__construct();

		$this->load->model('M_User', 'Users');
	}

	public function index_get()
	{
		$this->success("WELCOME TO LIGHT API");
	}
}
