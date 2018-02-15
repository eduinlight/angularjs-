<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_User extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'user';
    $this->id = 'id';
  }

}
