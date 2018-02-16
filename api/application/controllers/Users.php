<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/RestServiceUsers.php');

class Users extends RestServiceUsers {

	function __construct() {
		parent::__construct();

		$this->only_access(array('admin'));

		$this->load->model('M_User', 'Users');
	}

	public function index_get($id = null) {
		if(!isset($id)){
			$this->success($this->Users->list_all());
		}else{
			$user = $this->Users->get($id);
			if(!$user){
				$this->not_found();
			}
			$this->success($user);
		}
	}

	public function index_post() {
		$this->form_validation->set_data($this->post());
		if(!$this->form_validation->run('user_add')){
			$this->data_errors($this->form_validation->error_array());
		}
		$id = $this->Users->insert(array(
			'user' => $this->post('user'),
			'pass' => md5($this->post('pass')),
			'first_name' => $this->post('first_name'),
			'last_name' => $this->post('last_name'),
			'rol' => 'user',
		));

		$this->success();
	}

	public function index_put($id)
	{
		$user = $this->Users->get($id);
		if(!$user){
			$this->not_found();
		}
		$this->form_validation->set_data($this->put());
		if(!$this->form_validation->run('user_edit')){
			$this->data_errors($this->form_validation->error_array());
		}

		$this->Users->update($id, array(
			'first_name' => $this->put('first_name'),
			'last_name' => $this->put('last_name'),
		));

		$this->success();
	}

	public function index_delete($id)
	{
		$user = $this->Users->get($id);
		if(!$user){
			$this->not_found();
		}
		$this->Users->delete(array('id' => $id));

		$this->success();
	}
}
