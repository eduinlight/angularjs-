<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/Users.php');

class ChangePassword extends Users {

	function __construct() {
		parent::__construct();

		$this->load->model('M_User', 'User');
	}

	public function index_post()
	{
		$user = $this->post("user");
		$pass = $this->post("pass");
		$new_pass = $this->post("new_pass");

		if(!isset($user) || $user=="") {
			@$data->user = "The user is required";
			$this->data_errors($data);
		}
		else{
			$user_data = $this->User->filter(array('user'=>$user));
			if (count($user_data)==0) {
				@$data->user = "The user not exist";
				$this->data_errors($data);
			} else if (strcmp(md5($pass), $user_data[0]->pass) != 0) {
				@$data->pass = "Wrong password";
				$this->data_errors($data);
			} else if (!isset($new_pass) || $new_pass=="") {
				@$data->new_pass = "Wrong new password";
				$this->data_errors($data);
			} else {
				$this->User->update($user_data[0]->id, array('password' => sha1($new_pass)));
				
				// RESPUESTA
				@$res->user_id = $user_data[0]->id;
				$this->success($res);
			}
		}
	}
}
