<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/Users.php');

class Companies extends Users {

	function __construct() {
		parent::__construct();

		$this->only_access('admin');

		$this->load->model('M_Company', 'Companies');
		$this->load->model('multi/M_CompanyDanceStyle', 'CompanyDanceStyles');
		$this->load->model('multi/M_CompanySchool', 'CompanySchools');
		$this->load->model('multi/M_CompanyPerson', 'CompanyPersons');
		$this->load->model('multi/M_CompanyWork', 'CompanyWorks');
		$this->load->model('M_Website', 'Websites');
		$this->load->model('multi/M_CompanyWebsite', 'CompanyWebsites');
		$this->load->model('M_City', 'Cities');
	}

	public function index_get($id = null)
	{
		if(!isset($id)){
			$this->success($this->Companies->list_all());
		}else{
			$company = $this->Companies->get($id);
			if(!$company){
				$this->not_found();
			}
			$this->success($company);
		}
	}

	public function index_post()
	{	
		$this->form_validation->set_data($this->post());
		if(!$this->form_validation->run('company')){
			$this->data_errors($this->form_validation->error_array());
		}
		$id = $this->Companies->insert(array(
			'name' => $this->post('name'),
			'address' => $this->post('address'),
			'phone' => $this->post('phone'),
			'description' => $this->post('description'),
			'history' => $this->post('history'),
			'_city' => $this->post('_city'),
		));

		//add websites
		foreach($this->post('_websites') as $ws){
			$id_website = $this->Websites->insert(array('url' => $ws));
			$this->CompanyWebsites->insert(array('_company' => $id, '_website'=>$id_website));
		}

		//add dance style
		foreach($this->post('_dance_styles') as $t){
			$this->CompanyDanceStyles->insert(array('_company' => $id, '_dance_style'=>$t));
		}

		//add work
		foreach($this->post('_works') as $t){
			$this->CompanyWorks->insert(array('_company' => $id, '_work'=>$t));
		}

		//add person
		foreach($this->post('_persons') as $t){
			$this->CompanyPersons->insert(array('_company' => $id, '_person'=>$t));
		}

		//add school
		foreach($this->post('_schools') as $t){
			$this->CompanySchools->insert(array('_company' => $id, '_school'=>$t));
		}

		$this->success();
	}

	public function index_put($id)
	{
		$company = $this->Companies->get($id);
		if(!$company){
			$this->not_found();
		}
		$this->form_validation->company_id = $company->id;
		$this->form_validation->set_data($this->put());
		if(!$this->form_validation->run('company')){
			$this->data_errors($this->form_validation->error_array());
		}

		$this->Companies->update($id, array(
			'name' => $this->put('name'),
			'address' => $this->put('address'),
			'phone' => $this->put('phone'),
			'description' => $this->put('description'),
			'history' => $this->put('history'),
			'_city' => $this->put('_city'),
		));

		//del websites
		$pss = $this->CompanyWebsites->filter(array('_company' => $id));
		foreach($pss as $ps){
			$this->Websites->delete(array('id' => $ps->_website));
		}
		$this->CompanyWebsites->delete(array('_company' => $id));

		//edit websites
		foreach($this->put('_websites') as $ws){
			$id_website = $this->Websites->insert(array('url' => $ws));
			$this->CompanyWebsites->insert(array('_company' => $id, '_website'=>$id_website));
		}

		//edit dance styles
		$this->CompanyDanceStyles->delete(array('_company' => $company->id));
		foreach($this->put('_dance_styles') as $ds){
			$this->CompanyDanceStyles->insert(array('_company' => $company->id, '_dance_style'=>$ds));
		}
		
		//edit works
		$this->CompanyWorks->delete(array('_company' => $company->id));
		foreach($this->put('_works') as $ds){
			$this->CompanyWorks->insert(array('_company' => $company->id, '_work'=>$ds));
		}

		//edit persons
		$this->CompanyPersons->delete(array('_company' => $company->id));
		foreach($this->put('_persons') as $ds){
			$this->CompanyPersons->insert(array('_company' => $company->id, '_person'=>$ds));
		}
		//edit schools
		$this->CompanySchools->delete(array('_company' => $company->id));
		foreach($this->put('_schools') as $ds){
			$this->CompanySchools->insert(array('_company' => $company->id, '_school'=>$ds));
		}

		$this->success();
	}

	public function index_delete($id)
	{
		$company = $this->Companies->get($id);
		if(!$company){
			$this->not_found();
		}
		$this->Companies->delete(array('id' => $id));

		//delete websites
		$websites = $this->CompanyWebsites->filter(array('_company' => $company->id));
		foreach($websites as $website)
			$this->Websites->delete(array('id' =>$website->id));
		$this->CompanyWebsites->delete(array('_company' => $company->id));

		//delete dance styles
		$this->CompanyDanceStyles->delete(array('_company' => $company->id));
		//delete works
		$this->CompanyWorks->delete(array('_company' => $company->id));
		//delete schools
		$this->CompanySchools->delete(array('_company' => $company->id));
		//delete persons
		$this->CompanyPersons->delete(array('_company' => $company->id));

		$this->success();
	}
}
