<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_PersonDanceStyle extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'person_dance_style';
    $this->trable_id = 'id';
  }

  public function get_persons($dance_style){
    return $this->get_childs('_dance_style', $dance_style, '_person', 'person');
  }

  public function get_dance_styles($person_id){
    return $this->get_childs('_person', $person_id, '_dance_style', 'dance_style');
  }

}
