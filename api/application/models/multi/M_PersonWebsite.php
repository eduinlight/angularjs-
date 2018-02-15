<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_PersonWebsite extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'person_website';
  }

  public function get_persons($website_id){
    return $this->get_childs('_website', $website_id, '_person', 'person');
  }

  public function get_websites($person_id){
    return $this->get_childs('_person', $person_id, '_website', 'website');
  }

}
