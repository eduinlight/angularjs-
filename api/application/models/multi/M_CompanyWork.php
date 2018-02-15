<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_CompanyWork extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'company_work';
    $this->trable_id = 'id';
  }

  public function get_companies($work){
    return $this->get_childs('_work', $work, '_company', 'company');
  }

  public function get_works($company_id){
    return $this->get_childs('_company', $company_id, '_work', 'work');
  }

}
