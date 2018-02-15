<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Form_validation extends CI_Form_validation{

	public function __construct($config = array()){
		parent::__construct($config);
		$this->set_error_delimiters('', '');
	}

	public $user_id;
  public function valid_user($user){
		$ci = $this->CI;
		$ci->load->Model('M_User', 'Users');
		$query = array('user' => $user);
		if($this->user_id!=null){
			@$query['id!='] = $id;
		}
		if(count($ci->Users->filter($query))==0){
			$this->set_message('valid_user', "The user already exist");
			return false;
		}
		return true;
	}

}
