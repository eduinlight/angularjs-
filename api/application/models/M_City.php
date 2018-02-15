<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_City extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'city';
    $this->id = 'id';

    $this->load->model('M_Country', 'Countries');
  }

  private $select_str = '
  city.id as id, 
  city.name as name,
  country.name as country
  ';

  public function list_all(){
    $this->db->select($this->select_str)
      ->from($this->table)
      ->order_by('name');
    $this->join_with('_country', 'country');
    return $this->db->get()->result();
  }

  public function get($id){
    $city = parent::get($id);
    $city->_country = $this->Countries->get($city->_country);
    return $city;
  }

}
