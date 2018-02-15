<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/Users.php');

class Persons extends Users {

	function __construct() {
		parent::__construct();

		$this->only_access('admin');

		$this->load->model('M_Person', 'Persons');
		$this->load->model('multi/M_PersonDanceStyle', 'PersonDanceStyles');
		$this->load->model('multi/M_PersonWebsite', 'PersonWebsites');
		$this->load->model('multi/M_PersonTitle', 'PersonTitles');
		$this->load->model('multi/M_PersonVenue', 'PersonVenues');
		$this->load->model('M_Website', 'Websites');
		$this->load->model('M_Media', 'Media');
	}

	public function index_get($id = null)
	{
		if(!isset($id)){
			$this->success($this->Persons->list_all());
		}else{
			$person = $this->Persons->get($id);
			if(!$person){
				$this->not_found();
			}
			$this->success($person);
		}
	}

	public function index_post()
	{	
		$this->form_validation->set_data($this->post());
		if(!$this->form_validation->run('person')){
			$this->data_errors($this->form_validation->error_array());
		}
		$media_id = $this->post('_avatar')['id'];
		$id = $this->Persons->insert(array(
			'first_name' => $this->post('first_name'),
			'last_name' => $this->post('last_name'),
			'date_born' => $this->post('date_born'),
			'date_dead' => $this->post('date_dead'),
			'gender' => $this->post('gender'),
			'email' => $this->post('email'),
			'biografy' => $this->post('biografy'),
			'_city' => $this->post('_city'),
			'_avatar' => $media_id
		));

		//activar el archivo
		$this->Media->update($media_id, array('used' => true));

		//add websites
		foreach($this->post('_websites') as $ws){
			$id_website = $this->Websites->insert(array('url' => $ws));
			$this->PersonWebsites->insert(array('_person' => $id, '_website'=>$id_website));
		}

		//add titles
		foreach($this->post('_titles') as $t){
			$this->PersonTitles->insert(array('_person' => $id, '_title'=>$t));
		}

		//add dance style
		foreach($this->post('_dance_styles') as $t){
			$this->PersonDanceStyles->insert(array('_person' => $id, '_dance_style'=>$t));
		}

		//add venues
		foreach($this->post('_venues') as $t){
			$this->PersonVenues->insert(array('_person' => $id, '_venue'=>$t));
		}

		$this->success();
	}

	public function index_put($id)
	{
		$person = $this->Persons->get($id);
		if(!$person){
			$this->not_found();
		}
		$this->form_validation->person_id = $person->id;
		$this->form_validation->set_data($this->put());
		if(!$this->form_validation->run('person')){
			$this->data_errors($this->form_validation->error_array());
		}

		$new_avatar = $this->put('_avatar')['id'];
		$this->Persons->update($id, array(
			'first_name' => $this->put('first_name'),
			'last_name' => $this->put('last_name'),
			'date_born' => $this->put('date_born'),
			'date_dead' => $this->put('date_dead'),
			'gender' => $this->put('gender'),
			'email' => $this->put('email'),
			'biografy' => $this->put('biografy'),
			'_city' => $this->put('_city'),
			'_avatar' => $new_avatar
		));

		//eliminar la imagen anterior en caso de ser nueva
		if(isset($person->_avatar->id) && $person->_avatar->id!=$new_avatar){
			$this->upload->remove_uploaded($person->_avatar->id);
		}
	
		//activar el nuevo
		$this->Media->update($new_avatar, array('used' => true));

		//del websites
		$pss = $this->PersonWebsites->filter(array('_person' => $id));
		foreach($pss as $ps){
			$this->Websites->delete(array('id' => $ps->_website));
		}
		$this->PersonWebsites->delete(array('_person' => $id));

		//edit websites
		foreach($this->put('_websites') as $ws){
			$id_website = $this->Websites->insert(array('url' => $ws));
			$this->PersonWebsites->insert(array('_person' => $id, '_website'=>$id_website));
		}

		//edit titles
		$this->PersonTitles->delete(array('_person' => $person->id));
		foreach($this->put('_titles') as $t){
			$this->PersonTitles->insert(array('_person' => $person->id, '_title'=>$t));
		}

		//edit dance styles
		$this->PersonDanceStyles->delete(array('_person' => $person->id));
		foreach($this->put('_dance_styles') as $ds){
			$this->PersonDanceStyles->insert(array('_person' => $person->id, '_dance_style'=>$ds));
		}

		//edit venues
		$this->PersonVenues->delete(array('_person' => $person->id));
		foreach($this->put('_venues') as $ds){
			$this->PersonVenues->insert(array('_person' => $person->id, '_venue'=>$ds));
		}

		$this->success();
	}

	public function index_delete($id)
	{
		$person = $this->Persons->get($id);
		if(!$person){
			$this->not_found();
		}
		$this->Persons->delete(array('id' => $id));

		//delete titles
		$this->PersonTitles->delete(array('_person' => $person->id));

		//delete websites
		$websites = $this->PersonWebsites->filter(array('_person' => $person->id));
		foreach($websites as $website)
			$this->Websites->delete(array('id' =>$website->id));
		$this->PersonWebsites->delete(array('_person' => $person->id));

		//delete venues
		$this->PersonVenues->delete(array('_person' => $person->id));

		//delete dance styles
		$this->PersonDanceStyles->delete(array('_person' => $person->id));

		//eliminar  avatar
		if(isset($person->_avatar->id)){
			$this->upload->remove_uploaded($person->_avatar->id);
		}

		$this->success();
	}
}
