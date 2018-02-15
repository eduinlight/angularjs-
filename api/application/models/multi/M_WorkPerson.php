<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_WorkPerson extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'work_person';
  }

  public function get_works($person_id){
    return $this->get_childs('_person', $person_id, '_work', 'work');
  }

  public function get_persons($work_id){
    return $this->get_childs('_work', $work_id, '_person', 'person');
  }

}
