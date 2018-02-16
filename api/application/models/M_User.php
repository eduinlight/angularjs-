<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_User extends MY_Model {

  public $select_str = '';

  public function __construct() {
    parent::__construct();

    $this->table = 'user';
    $this->id = 'id';

    $this->select_str = 'id, user, first_name, last_name, rol';
  }

  public function list_all(){
    $this->db->select($this->select_str)
      ->from($this->table)
      ->where('rol!=', 'admin')
      ->order_by('user');
    return $this->db->get()->result();
  }

  public function get($id){
    $this->db->select($this->select_str)
      ->from($this->table)
      ->where('rol!=', 'admin')
      ->where('id', $id);
    return $this->db->get()->row();
  }


}
