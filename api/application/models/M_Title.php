<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_Title extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'title';
    $this->id = 'id';
  }

}
