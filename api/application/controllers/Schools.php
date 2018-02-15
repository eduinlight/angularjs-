<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/Users.php');

class Schools extends Users {

	function __construct() {
		parent::__construct();

		$this->only_access('admin');

		$this->load->model('M_School', 'Schools');
		$this->load->model('multi/M_SchoolDanceStyle', 'SchoolDanceStyles');
		$this->load->model('multi/M_SchoolWebsite', 'SchoolWebsites');
		$this->load->model('multi/M_SchoolPerson', 'SchoolPersons');
		$this->load->model('M_Website', 'Websites');
		$this->load->model('M_Media', 'Media');
	}

	public function index_get($id = null)
	{
		if(!isset($id)){
			$this->success($this->Schools->list_all());
		}else{
			$school = $this->Schools->get($id);
			if(!$school){
				$this->not_found();
			}
			$this->success($school);
		}
	}

	public function index_post()
	{	
		$this->form_validation->set_data($this->post());
		if(!$this->form_validation->run('school')){
			$this->data_errors($this->form_validation->error_array());
		}
		$media_id = $this->post('_avatar')['id'];
		$id = $this->Schools->insert(array(
			'name' => $this->post('name'),
			'address' => $this->post('address'),
			'phone' => $this->post('phone'),
			'description' => $this->post('description'),
			'type' => $this->post('type'),
			'_city' => $this->post('_city'),
			'_avatar' => $media_id
		));

		//activar el archivo
		$this->Media->update($media_id, array('used' => true));

		//add websites
		foreach($this->post('_websites') as $ws){
			$id_website = $this->Websites->insert(array('url' => $ws));
			$this->SchoolWebsites->insert(array('_school' => $id, '_website'=>$id_website));
		}

		//add dance style
		foreach($this->post('_dance_styles') as $t){
			$this->SchoolDanceStyles->insert(array('_school' => $id, '_dance_style'=>$t));
		}

		//add persons
		foreach($this->post('_persons') as $t){
			$this->SchoolPersons->insert(array('_school' => $id, '_person'=>$t));
		}

		$this->success();
	}

	public function index_put($id)
	{
		$school = $this->Schools->get($id);
		if(!$school){
			$this->not_found();
		}
		$this->form_validation->school_id = $school->id;
		$this->form_validation->set_data($this->put());
		if(!$this->form_validation->run('school')){
			$this->data_errors($this->form_validation->error_array());
		}

		$new_avatar = $this->put('_avatar')['id'];
		$this->Schools->update($id, array(
			'name' => $this->put('name'),
			'address' => $this->put('address'),
			'phone' => $this->put('phone'),
			'description' => $this->put('description'),
			'type' => $this->put('type'),
			'_city' => $this->put('_city'),
			'_avatar' => $new_avatar
		));

		//eliminar la imagen anterior en caso de ser nueva
		if(isset($school->_avatar->id) && $school->_avatar->id!=$new_avatar){
			$this->upload->remove_uploaded($school->_avatar->id);
		}
	
		//activar el nuevo
		$this->Media->update($new_avatar, array('used' => true));

		//del websites
		$pss = $this->SchoolWebsites->filter(array('_school' => $id));
		foreach($pss as $ps){
			$this->Websites->delete(array('id' => $ps->_website));
		}
		$this->SchoolWebsites->delete(array('_school' => $id));

		//edit websites
		foreach($this->put('_websites') as $ws){
			$id_website = $this->Websites->insert(array('url' => $ws));
			$this->SchoolWebsites->insert(array('_school' => $id, '_website'=>$id_website));
		}

		//edit dance styles
		$this->SchoolDanceStyles->delete(array('_school' => $school->id));
		foreach($this->put('_dance_styles') as $ds){
			$this->SchoolDanceStyles->insert(array('_school' => $school->id, '_dance_style'=>$ds));
		}

		//edit venues
		$this->SchoolPersons->delete(array('_school' => $school->id));
		foreach($this->put('_persons') as $ds){
			$this->SchoolPersons->insert(array('_school' => $school->id, '_person'=>$ds));
		}

		$this->success();
	}

	public function index_delete($id)
	{
		$school = $this->Schools->get($id);
		if(!$school){
			$this->not_found();
		}
		$this->Schools->delete(array('id' => $id));

		//delete websites
		$websites = $this->SchoolWebsites->filter(array('_school' => $school->id));
		foreach($websites as $website)
			$this->Websites->delete(array('id' =>$website->id));
		$this->SchoolWebsites->delete(array('_school' => $school->id));

		//delete persons
		$this->SchoolPersons->delete(array('_school' => $school->id));

		//delete dance styles
		$this->SchoolDanceStyles->delete(array('_school' => $school->id));

		//eliminar  avatar
		if(isset($school->_avatar->id)){
			$this->upload->remove_uploaded($school->_avatar->id);
		}

		$this->success();
	}
}
