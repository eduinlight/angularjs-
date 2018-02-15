<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_CompanySchool extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'company_school';
    $this->trable_id = 'id';
  }

  public function get_companies($school){
    return $this->get_childs('_school', $school, '_company', 'company');
  }

  public function get_schools($company_id){
    return $this->get_childs('_company', $company_id, '_school', 'school');
  }

}
