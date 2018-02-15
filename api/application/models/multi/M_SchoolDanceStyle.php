<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_SchoolDanceStyle extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'school_dance_style';
    $this->trable_id = 'id';
  }

  public function get_schools($dance_style){
    return $this->get_childs('_dance_style', $dance_style, '_school', 'school');
  }

  public function get_dance_styles($school_id){
    return $this->get_childs('_school', $school_id, '_dance_style', 'dance_style');
  }

}
