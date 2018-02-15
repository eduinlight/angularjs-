<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Model extends CI_Model {

	function __construct() {
		parent::__construct();
		$this->load->database();
	}

	protected function call( $procedure )
	{
		$query =  $this->db->query($procedure);
		$res = $query->result();
		$query->next_result();
		$query->free_result();
		return $res;
	}

	protected function generate_count($table, $new_field){
		return '(SELECT COUNT(*) FROM '.$table.' WHERE '.$table.'._'.$this->table.' = '.$this->table.'.id) as '.$new_field;
	}

	protected $table = 'user';
	protected $id = 'id';

	public function list_all(){
		return $this->db->get($this->table)->result();
	}

	public function get($id){
		return $this->db->get_where($this->table, array($this->id => $id))->row();
	}

	public function filter($data, $limit=null, $offset=null){
		return $this->db->get_where($this->table, $data, $limit, $offset)->result();
	}

	public function insert($data){
		$this->db->insert($this->table, $data);

		return $this->db->insert_id();
	}

	public function update($id, $data){
		$this->db->where($this->id, $id);
		$this->db->update($this->table, $data);
	}

	public function delete($data){
		$this->db->delete($this->table, $data);
	}

	public function count(){
		return $this->db->count_all_results($this->table);
	}

	public function join_with($field, $table, $table_id='id', $type='inner'){
		$this->db->join($table, $table.'.'.$table_id.'='.$this->table.'.'.$field, $type);
	}

	//select all the childs of a parent
	public function get_childs($parent_field_id, $parent_id, $childs_field, $childs_table){
    $this->db->select($childs_table.'.*')
      ->from($this->table)
      ->where($this->table.'.'.$parent_field_id, $parent_id);
    $this->db->join($childs_table, $this->table.'.'.$childs_field.'='.$childs_table.'.id', 'inner');
    return $this->db->get()->result();
	}
}
