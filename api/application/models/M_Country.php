<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_Country extends MY_Model {

  protected $select_str;

  public function __construct() {
    parent::__construct();

    $this->table = 'country';
    $this->id = 'id';

    $this->load->model('M_City', 'Cities');

    $this->select_str = '
      country.id as id, 
      country.name as name,'.
      $this->generate_count('city', 'cant_cities');
  }

  public function list_all(){
    $this->db->select($this->select_str)
      ->from($this->table)
      ->order_by('name');
    return $this->db->get()->result();
  }

  public function get($id){
    $country = parent::get($id);
    if($country!=null)
      @$country->_cities = $this->Cities->filter(array('_country'=> $id));
    return $country;
  }

}
