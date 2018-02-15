<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/Users.php');

class User extends Users {

	function __construct() {
		parent::__construct();

		$this->only_access('admin');

		$this->load->model('M_User', 'Users');
	}

	public function index_get($id = null) {
		if(!isset($id)){
			$this->success($this->Users->list_all());
		}else{
			$user = $this->User->get($id);
			if(!$user){
				$this->not_found();
			}
			$this->success($user);
		}
	}

	public function index_post() {
		$this->form_validation->set_data($this->post());
		if(!$this->form_validation->run('user')){
			$this->data_errors($this->form_validation->error_array());
		}
		$id = $this->User->insert(array(
			'user' => $this->post('user'),
			'pass' => md5($this->post('pass')),
			'first_name' => $this->post('first_name'),
			'last_name' => $this->post('last_name'),
		));

		$this->success();
	}

	public function index_put($id)
	{
		$user = $this->User->get($id);
		if(!$user){
			$this->not_found();
		}
		$this->form_validation->user_id = $user->id;
		$this->form_validation->set_data($this->put());
		if(!$this->form_validation->run('user')){
			$this->data_errors($this->form_validation->error_array());
		}

		$this->User->update($id, array(
			'user' => $this->post('user'),
			'pass' => md5($this->post('pass')),
			'first_name' => $this->post('first_name'),
			'last_name' => $this->post('last_name'),
		));

		$this->success();
	}

	public function index_delete($id)
	{
		$user = $this->User->get($id);
		if(!$user){
			$this->not_found();
		}
		$this->User->delete(array('id' => $id));

		$this->success();
	}
}
