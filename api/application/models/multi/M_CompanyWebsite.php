<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_CompanyWebsite extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'company_website';
    $this->trable_id = 'id';
  }

  public function get_companies($website){
    return $this->get_childs('_website', $website, '_company', 'company');
  }

  public function get_websites($company_id){
    return $this->get_childs('_company', $company_id, '_website', 'website');
  }

}
