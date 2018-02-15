<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_Website extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'website';
    $this->id = 'id';
  }

}
