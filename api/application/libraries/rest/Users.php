<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once(__DIR__.'/RestService.php');

class Users extends RestService {

  protected $access_token = "";
  protected $payload = null;

  function __construct() {
    parent::__construct();

    $headers = $this->input->request_headers();

    if(!isset($headers['Authorization'])){
      $this->token_invalid();
    }

    $auth = explode(' ', $headers['Authorization']);
    if(count($auth)<=1 || $auth[0]!='Bearer'){
      $this->token_invalid();
    }

    $this->access_token = $auth[1];
    $this->payload = $this->from_jwt($this->access_token);
    if(!isset($this->payload)){
      $this->token_invalid();
    }
  }

  protected function only_access($rol){
    if($this->payload->rol!=$rol)
      $this->not_allowed();
  }
}
