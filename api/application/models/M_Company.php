<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_Company extends MY_Model {

  protected $select_str;

  public function __construct() {
    parent::__construct();

    $this->table = 'company';
    $this->id = 'id';

    $this->select_str =
      $this->table.'.*, '.
      $this->generate_count('company_dance_style', 'cant_dance_styles').', '.
      $this->generate_count('company_work', 'cant_works').', '.
      $this->generate_count('company_person', 'cant_persons').', '.
      $this->generate_count('company_school', 'cant_school');
  }

  public function list_all(){
    $this->db->select($this->select_str)
      ->from($this->table)
      ->order_by('name');
    return $this->db->get()->result();
  }

  public function get($id){
    $company = parent::get($id);
    if($company!=null){
      $this->load->model('multi/M_CompanyDanceStyle', 'CompanyDanceStyles');
      $this->load->model('multi/M_CompanySchool', 'CompanySchools');
      $this->load->model('multi/M_CompanyPerson', 'CompanyPersons');
      $this->load->model('multi/M_CompanyWork', 'CompanyWorks');
      $this->load->model('multi/M_CompanyWebsite', 'CompanyWebsites');
      $this->load->model('M_City', 'Cities');
      @$company->_dance_styles = $this->CompanyDanceStyles->get_dance_styles($company->id);
      @$company->_schools = $this->CompanySchools->get_schools($company->id);
      @$company->_persons = $this->CompanyPersons->get_persons($company->id);
      @$company->_works = $this->CompanyWorks->get_works($company->id);
      @$company->_city = $this->Cities->get($company->_city);
      @$company->_websites = $this->CompanyWebsites->get_websites($company->id);
    }
    return $company;
  }

}
