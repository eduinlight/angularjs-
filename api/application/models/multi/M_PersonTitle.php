<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_PersonTitle extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'person_title';
  }

  public function get_persons($title_id){
    return $this->get_childs('_titles', $title_id, '_person', 'person');
  }

  public function get_titles($person_id){
    return $this->get_childs('_person', $person_id, '_title', 'title');
  }

}
