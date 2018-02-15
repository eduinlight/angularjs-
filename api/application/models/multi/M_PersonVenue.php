<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_PersonVenue extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'person_venue';
  }

  public function get_persons($place_id){
    return $this->get_childs('_venue', $place_id, '_person', 'person');
  }

  public function get_venues($person_id){
    return $this->get_childs('_person', $person_id, '_venue', 'venue');
  }

}
