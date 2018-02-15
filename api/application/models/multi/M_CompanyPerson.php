<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_CompanyPerson extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'company_person';
    $this->trable_id = 'id';
  }

  public function get_companies($person){
    return $this->get_childs('_person', $person, '_company', 'company');
  }

  public function get_persons($company_id){
    return $this->get_childs('_company', $company_id, '_person', 'person');
  }

}
