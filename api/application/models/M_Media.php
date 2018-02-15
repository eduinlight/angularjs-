<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_Media extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'media';
    $this->id = 'id';
  }

}
