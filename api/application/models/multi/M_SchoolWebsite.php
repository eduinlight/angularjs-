<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_SchoolWebsite extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'school_website';
  }

  public function get_schools($website_id){
    return $this->get_childs('_website', $website_id, '_school', 'school');
  }

  public function get_websites($school_id){
    return $this->get_childs('_school', $school_id, '_website', 'website');
  }

}
