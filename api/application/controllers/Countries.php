<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/Users.php');

class Countries extends Users {

	function __construct() {
		parent::__construct();

		$this->only_access('admin');

		$this->load->model('M_Country', 'Countries');
	}

	public function index_get($id = null)
	{
		if(!isset($id)){
			$this->success($this->Countries->list_all());
		}else{
			$country = $this->Countries->get($id);
			if(!$country){
				$this->not_found();
			}
			$this->success($country);
		}
	}

	public function index_post()
	{
		$this->form_validation->set_data($this->post());
		if(!$this->form_validation->run('country')){
			$this->data_errors($this->form_validation->error_array());
		}
		$id = $this->Countries->insert(array('name' => $this->post('name')));

		$this->success();
	}

	public function index_put($id)
	{
		$country = $this->Countries->get($id);
		if(!$country){
			$this->not_found();
		}
		$this->form_validation->country_id = $country->id;
		$this->form_validation->set_data($this->put());
		if(!$this->form_validation->run('country')){
			$this->data_errors($this->form_validation->error_array());
		}
		$this->Countries->update($id, array('name' => $this->put('name')));

		$this->success();
	}

	public function index_delete($id)
	{
		$country = $this->Countries->get($id);
		if(!$country){
			$this->not_found();
		}
		$this->Countries->delete(array('id' => $id));

		$this->success();
	}
}
