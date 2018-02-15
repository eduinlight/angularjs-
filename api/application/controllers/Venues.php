<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/Users.php');

class Venues extends Users {

	function __construct() {
		parent::__construct();

		$this->only_access('admin');

		$this->load->model('M_Venue', 'Venues');
		$this->load->model('multi/M_VenueWebsite', 'VenueWebsites');
		$this->load->model('M_Website', 'Websites');
		$this->load->model('M_Media', 'Media');
	}

	public function index_get($id = null)
	{
		if(!isset($id)){
			$this->success($this->Venues->list_all());
		}else{
			$venue = $this->Venues->get($id);
			if(!$venue){
				$this->not_found();
			}
			$this->success($venue);
		}
	}

	public function index_post()
	{	
		$this->form_validation->set_data($this->post());
		if(!$this->form_validation->run('venue')){
			$this->data_errors($this->form_validation->error_array());
		}
		$id = $this->Venues->insert(array(
			'name' => $this->post('name'),
			'address' => $this->post('address'),
			'phone' => $this->post('phone'),
			'description' => $this->post('description'),
			'rental_information' => $this->post('rental_information'),
			'_city' => $this->post('_city'),
		));

		//add websites
		foreach($this->post('_websites') as $ws){
			$id_website = $this->Websites->insert(array('url' => $ws));
			$this->VenueWebsites->insert(array('_venue' => $id, '_website'=>$id_website));
		}

		$this->success();
	}

	public function index_put($id)
	{
		$venue = $this->Venues->get($id);
		if(!$venue){
			$this->not_found();
		}
		$this->form_validation->venue_id = $venue->id;
		$this->form_validation->set_data($this->put());
		if(!$this->form_validation->run('venue')){
			$this->data_errors($this->form_validation->error_array());
		}
		$this->Venues->update($id, array(
			'name' => $this->put('name'),
			'address' => $this->put('address'),
			'phone' => $this->put('phone'),
			'description' => $this->put('description'),
			'rental_information' => $this->put('rental_information'),
			'_city' => $this->put('_city'),
		));
		//del websites
		$pss = $this->VenueWebsites->filter(array('_venue' => $id));
		foreach($pss as $ps){
			$this->Websites->delete(array('id' => $ps->_website));
		}
		$this->VenueWebsites->delete(array('_venue' => $id));

		//edit websites
		foreach($this->put('_websites') as $ws){
			$id_website = $this->Websites->insert(array('url' => $ws));
			$this->VenueWebsites->insert(array('_venue' => $id, '_website'=>$id_website));
		}

		$this->success();
	}

	public function index_delete($id)
	{
		$venue = $this->Venues->get($id);
		if(!$venue){
			$this->not_found();
		}
		$this->Venues->delete(array('id' => $id));

		//delete websites
		$websites = $this->VenueWebsites->filter(array('_venue' => $venue->id));
		foreach($websites as $website)
			$this->Websites->delete(array('id' =>$website->id));
		$this->VenueWebsites->delete(array('_venue' => $venue->id));

		$this->success();
	}
}
