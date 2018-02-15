<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_DanceStyle extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'dance_style';
    $this->id = 'id';
  }

}
