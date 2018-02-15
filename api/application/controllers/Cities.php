<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/Users.php');

class Cities extends Users {

	function __construct() {
		parent::__construct();

		$this->only_access('admin');

		$this->load->model('M_City', 'Cities');
		$this->load->model('M_Country', 'Countries');
	}

	public function index_get($id = null)
	{
		if(!isset($id) && $this->get('country_id')==null){
			$this->success($this->Cities->list_all());
		}else if(!isset($id)){
			$country = $this->Countries->get($this->get('country_id'));
			if($country==null){
				$this->not_found();
			}
			$this->success($this->Cities->filter(array('_country' => $this->get('country_id'))));
		}else{
			$city = $this->Cities->get($id);
			if(!$city){
				$this->not_found();
			}
			$this->success($city);
		}
	}

	public function index_post()
	{
		$this->form_validation->set_data($this->post());
		if(!$this->form_validation->run('city')){
			$this->data_errors($this->form_validation->error_array());
		}
		$id = $this->Cities->insert(array(
			'name' => $this->post('name'),
			'_country' => $this->post('_country')
		));

		$this->success();
	}

	public function index_put($id)
	{
		$city = $this->Cities->get($id);
		if(!$city){
			$this->not_found();
		}
		$this->form_validation->city_id = $city->id;
		$this->form_validation->set_data($this->put());
		if(!$this->form_validation->run('city')){
			$this->data_errors($this->form_validation->error_array());
		}
		$this->Cities->update($id, array(
			'name' => $this->put('name'),
			'_country' => $this->put('_country')
		));

		$this->success();
	}

	public function index_delete($id)
	{
		$city = $this->Cities->get($id);
		if(!$city){
			$this->not_found();
		}
		$this->Cities->delete(array('id' => $id));

		$this->success();
	}
}
