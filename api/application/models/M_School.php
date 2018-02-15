<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_School extends MY_Model {

  protected $select_str;

  public function __construct() {
    parent::__construct();

    $this->table = 'school';
    $this->id = 'id';

    $this->select_str =
      $this->table.'.*, '.
      $this->generate_count('school_dance_style', 'cant_dance_styles').', '.
      $this->generate_count('school_person', 'cant_persons');
  }

  public function list_all(){
    $this->db->select($this->select_str)
      ->from($this->table)
      ->order_by('name');
    return $this->db->get()->result();
  }

  public function get($id){
    $school = parent::get($id);
    if($school!=null){
      $this->load->model('multi/M_SchoolDanceStyle', 'SchoolDanceStyles');
      $this->load->model('multi/M_SchoolWebsite', 'SchoolWebsite');
      $this->load->model('multi/M_SchoolPerson', 'SchoolPersons');
      $this->load->model('M_Media', 'Media');
      $this->load->model('M_City', 'Cities');
      if(($m = $this->Media->get($school->_avatar))!=null){
        @$school->_avatar = null;
        @$school->_avatar->id = $m->id;
        @$school->_avatar->url = base_url($m->url);
      }
      @$school->_dance_styles = $this->SchoolDanceStyles->get_dance_styles($school->id);
      @$school->_websites = $this->SchoolWebsite->get_websites($school->id);
      @$school->_persons = $this->SchoolPersons->get_persons($school->id);
      @$school->_city = $this->Cities->get($school->_city);
    }
    return $school;
  }

}
