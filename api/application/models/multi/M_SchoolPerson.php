<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_SchoolPerson extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'school_person';
  }

  public function get_persons($school_id){
    return $this->get_childs('_school', $school_id, '_person', 'person');
  }

  public function get_schools($person_id){
    return $this->get_childs('_person', $person_id, '_school', 'school');
  }

}
