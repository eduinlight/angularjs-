<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_Work extends MY_Model {

  protected $select_str;

  public function __construct() {
    parent::__construct();

    $this->table = 'work';
    $this->id = 'id';

    $this->select_str =
      $this->table.'.*, '.
      $this->generate_count('work_person', 'cant_persons').', '.
      $this->generate_count('work_dance_style', 'cant_dance_styles');
  }

  public function list_all(){
    $this->db->select($this->select_str)
      ->from($this->table)
      ->order_by('name');
    return $this->db->get()->result();
  }

  public function get($id){
    $work = parent::get($id);
    if($work!=null){
      $this->load->model('multi/M_WorkPerson', 'WorkPersons');
      $this->load->model('multi/M_WorkDanceStyle', 'WorkDanceStyles');
      $this->load->model('M_Company', 'Companies');
      $this->load->model('M_Venue', 'Venues');
      @$work->_persons = $this->WorkPersons->get_persons($work->id);
      @$work->_dance_styles = $this->WorkDanceStyles->get_dance_styles($work->id);
      @$work->_premiere_venue = $this->Venues->get($work->_premiere_venue);
      @$work->_premiere_company = $this->Companies->get($work->_premiere_company);
    }
    return $work;
  }

}
