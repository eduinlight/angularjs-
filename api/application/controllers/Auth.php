<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/RestService.php');

class Auth extends RestService {

	function __construct() {
		parent::__construct();

		$this->load->model('M_User', 'User');
	}

	public function login_post()
	{
		$user = $this->post("user");
		$pass = $this->post("pass");

		if(!isset($user) || $user=="") {
			@$data->user = "The user is required";
			$this->data_errors($data);
		}
		else{
			$user_data = $this->User->filter(array('user'=>$user));
			if (count($user_data)==0) {
				@$data->user = "The user not exist";
				$this->data_errors($data);
			} else if (strcmp(sha1($pass), $user_data[0]->password) != 0) {
				@$data->pass = "Wrong password";
				$this->data_errors($data);
			} else {
				//actualizar ultima fecha de ultimo loggin
				$last_login = time();
				$this->User->update($user_data[0]->id, array('last_login' => $last_login));

				// DATOS EN PAYLOAD
				@$payload->user_id = $user_data[0]->id;
				@$payload->rol = $user_data[0]->rol;
				@$payload->user = $user_data[0]->user;
				@$payload->login_date = $last_login;
				@$payload->access_token = $this->to_jwt($payload);
				
				// RESPUESTA
				$this->success($payload);
			}
		}
	}

	public function change_password_post()
	{
		$user = $this->post("user");
		$pass = $this->post("pass");
		$new_pass = $this->post("new_pass");

		if(!isset($user) || $user=="") {
			@$data->user = "The user is required";
			$this->data_errors($data);
		}
	}
}
