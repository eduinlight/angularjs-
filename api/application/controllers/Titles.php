<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/Users.php');

class Titles extends Users {

	function __construct() {
		parent::__construct();

		$this->only_access('admin');

		$this->load->model('M_Title', 'Titles');
	}

	public function index_get($id = null)
	{
		if(!isset($id)){
			$this->success($this->Titles->list_all());
		}else{
			$title = $this->Titles->get($id);
			if(!$title){
				$this->not_found();
			}
			$this->success($title);
		}
	}

	public function index_post()
	{
		$this->form_validation->set_data($this->post());
		if(!$this->form_validation->run('title')){
			$this->data_errors($this->form_validation->error_array());
		}
		$id = $this->Titles->insert(array('name' => $this->post('name')));

		$this->success();
	}

	public function index_put($id)
	{
		$title = $this->Titles->get($id);
		if(!$title){
			$this->not_found();
		}
		$this->form_validation->title_id = $title->id;
		$this->form_validation->set_data($this->put());
		if(!$this->form_validation->run('title')){
			$this->data_errors($this->form_validation->error_array());
		}
		$this->Titles->update($id, array('name' => $this->put('name')));

		$this->success();
	}

	public function index_delete($id)
	{
		$title = $this->Titles->get($id);
		if(!$title){
			$this->not_found();
		}
		$this->Titles->delete(array('id' => $id));

		$this->success();
	}
}
