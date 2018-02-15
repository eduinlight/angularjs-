<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_CompanyDanceStyle extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'company_dance_style';
    $this->trable_id = 'id';
  }

  public function get_companies($dance_style){
    return $this->get_childs('_dance_style', $dance_style, '_company', 'company');
  }

  public function get_dance_styles($company_id){
    return $this->get_childs('_company', $company_id, '_dance_style', 'dance_style');
  }

}
