<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_Person extends MY_Model {

  protected $select_str;

  public function __construct() {
    parent::__construct();

    $this->table = 'person';
    $this->id = 'id';

    $this->select_str =
      $this->table.'.*, '.
      $this->generate_count('person_title', 'cant_titles').', '.
      $this->generate_count('person_dance_style', 'cant_dance_styles').', '.
      $this->generate_count('person_place', 'cant_dance_places');
  }

  public function list_all(){
    $this->db->select($this->select_str)
      ->from($this->table)
      ->order_by('first_name');
    return $this->db->get()->result();
  }

  public function get($id){
    $person = parent::get($id);
    if($person!=null){
      $this->load->model('multi/M_PersonDanceStyle', 'PersonDanceStyles');
      $this->load->model('multi/M_PersonWebsite', 'PersonWebsite');
      $this->load->model('multi/M_PersonTitle', 'PersonTitle');
      $this->load->model('multi/M_PersonVenue', 'PersonVenues');
      $this->load->model('M_Media', 'Media');
      $this->load->model('M_City', 'Cities');
      if(($m = $this->Media->get($person->_avatar))!=null){
        @$person->_avatar = null;
        @$person->_avatar->id = $m->id;
        @$person->_avatar->url = base_url($m->url);
      }
      @$person->_dance_styles = $this->PersonDanceStyles->get_dance_styles($person->id);
      @$person->_websites = $this->PersonWebsite->get_websites($person->id);
      @$person->_titles = $this->PersonTitle->get_titles($person->id);
      @$person->_venues = $this->PersonVenues->get_venues($person->id);
      @$person->_city = $this->Cities->get($person->_city);
    }
    return $person;
  }

}
