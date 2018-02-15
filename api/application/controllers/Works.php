<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/Users.php');

class Works extends Users {

	function __construct() {
		parent::__construct();

		$this->only_access('admin');

		$this->load->model('M_Work', 'Works');
		$this->load->model('multi/M_WorkDanceStyle', 'WorkDanceStyles');
		$this->load->model('multi/M_WorkPerson', 'WorkPersons');
		$this->load->model('M_Media', 'Media');
	}

	public function index_get($id = null)
	{
		if(!isset($id)){
			$this->success($this->Works->list_all());
		}else{
			$work = $this->Works->get($id);
			if(!$work){
				$this->not_found();
			}
			$this->success($work);
		}
	}

	public function index_post()
	{	
		$this->form_validation->set_data($this->post());
		if(!$this->form_validation->run('work')){
			$this->data_errors($this->form_validation->error_array());
		}
		$id = $this->Works->insert(array(
			'name' => $this->post('name'),
			'description' => $this->post('description'),
			'characters' => $this->post('characters'),
			'runtime' => $this->post('runtime'),
			'licensing_info' => $this->post('licensing_info'),
			'premiere_date' => $this->post('premiere_date'),
			'_premiere_company' => $this->post('_premiere_company'),
			'_premiere_venue' => $this->post('_premiere_venue'),
		));

		//add dance style
		foreach($this->post('_dance_styles') as $t){
			$this->WorkDanceStyles->insert(array('_work' => $id, '_dance_style'=>$t));
		}

		//add persons
		foreach($this->post('_persons') as $t){
			$this->WorkPersons->insert(array('_work' => $id, '_person'=>$t));
		}

		$this->success();
	}

	public function index_put($id)
	{
		$work = $this->Works->get($id);
		if(!$work){
			$this->not_found();
		}
		$this->form_validation->work_id = $work->id;
		$this->form_validation->set_data($this->put());
		if(!$this->form_validation->run('work')){
			$this->data_errors($this->form_validation->error_array());
		}

		$this->Works->update($id, array(
			'name' => $this->put('name'),
			'description' => $this->put('description'),
			'characters' => $this->put('characters'),
			'runtime' => $this->put('runtime'),
			'licensing_info' => $this->put('licensing_info'),
			'premiere_date' => $this->put('premiere_date'),
			'_premiere_company' => $this->put('_premiere_company'),
			'_premiere_venue' => $this->put('_premiere_venue'),
		));

		//edit dance styles
		$this->WorkDanceStyles->delete(array('_work' => $work->id));
		foreach($this->put('_dance_styles') as $ds){
			$this->WorkDanceStyles->insert(array('_work' => $work->id, '_dance_style'=>$ds));
		}

		//edit persons
		$this->WorkPersons->delete(array('_work' => $work->id));
		foreach($this->put('_persons') as $ds){
			$this->WorkPersons->insert(array('_work' => $work->id, '_person'=>$ds));
		}

		$this->success();
	}

	public function index_delete($id)
	{
		$work = $this->Works->get($id);
		if(!$work){
			$this->not_found();
		}
		$this->Works->delete(array('id' => $id));

		//delete persons
		$this->WorkPersons->delete(array('_work' => $work->id));

		//delete dance styles
		$this->WorkDanceStyles->delete(array('_work' => $work->id));

		$this->success();
	}
}
