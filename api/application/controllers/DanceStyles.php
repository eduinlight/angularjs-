<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/Users.php');

class DanceStyles extends Users {

	function __construct() {
		parent::__construct();

		$this->only_access('admin');

		$this->load->model('M_DanceStyle', 'DanceStyles');
	}

	public function index_get($id = null)
	{
		if(!isset($id)){
			$this->success($this->DanceStyles->list_all());
		}else{
			$danceStyle = $this->DanceStyles->get($id);
			if(!$danceStyle){
				$this->not_found();
			}
			$this->success($danceStyle);
		}
	}

	public function index_post()
	{
		$this->form_validation->set_data($this->post());
		if(!$this->form_validation->run('dance_style')){
			$this->data_errors($this->form_validation->error_array());
		}
		$id = $this->DanceStyles->insert(array('name' => $this->post('name')));

		$this->success();
	}

	public function index_put($id)
	{
		$danceStyle = $this->DanceStyles->get($id);
		if(!$danceStyle){
			$this->not_found();
		}
		$this->form_validation->danceStyle_id = $danceStyle->id;
		$this->form_validation->set_data($this->put());
		if(!$this->form_validation->run('dance_style')){
			$this->data_errors($this->form_validation->error_array());
		}
		$this->DanceStyles->update($id, array('name' => $this->put('name')));

		$this->success();
	}

	public function index_delete($id)
	{
		$danceStyle = $this->DanceStyles->get($id);
		if(!$danceStyle){
			$this->not_found();
		}
		$this->DanceStyles->delete(array('id' => $id));

		$this->success();
	}
}
