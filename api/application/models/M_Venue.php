<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_Venue extends MY_Model {

  protected $select_str;

  public function __construct() {
    parent::__construct();

    $this->table = 'venue';
    $this->id = 'id';

    $this->select_str =
      $this->table.'.*, '.
      $this->generate_count('venue_website', 'cant_titles');
  }

  public function list_all(){
    $this->db->select($this->select_str)
      ->from($this->table)
      ->order_by('name');
    return $this->db->get()->result();
  }

  public function get($id){
    $venue = parent::get($id);
    if($venue!=null){
      $this->load->model('multi/M_VenueWebsite', 'VenueWebsite');
      $this->load->model('M_City', 'Cities');
      @$venue->_websites = $this->VenueWebsite->get_websites($venue->id);
      @$venue->_city = $this->Cities->get($venue->_city);
    }
    return $venue;
  }

}
