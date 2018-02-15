<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Form_validation extends CI_Form_validation{

	public function __construct($config = array()){
		parent::__construct($config);
		$this->set_error_delimiters('', '');
	}

	public function valid_gender($g){
		if($g!='M' && $g!='F'){
			$this->set_message('valid_gender', "Incorrect gender");
			return false;
		}
		return true;
	}

  public function exist_city($id){
		$ci = $this->CI;
		$ci->load->Model('M_City', 'Cities');
		if(count($ci->Cities->filter(array('id' => $id)))==0){
			$this->set_message('exist_city', "The city don't exist");
			return false;
		}
		return true;
	}

	public function exist_venue($id){
		$ci = $this->CI;
		$ci->load->Model('M_Venue', 'Venue');
		if(count($ci->Venue->filter(array('id' => $id)))==0){
			$this->set_message('exist_venue', "The venue don't exist");
			return false;
		}
		return true;
	}

	public function exist_company($id){
		$ci = $this->CI;
		$ci->load->Model('M_Company', 'Company');
		if(count($ci->Company->filter(array('id' => $id)))==0){
			$this->set_message('exist_venue', "The company don't exist");
			return false;
		}
		return true;
	}

	public function exist_media($id){
		$ci = $this->CI;
		$ci->load->Model('M_Media', 'Media');
		if(count($ci->Media->filter(array('id' => $id)))==0){
			$this->set_message('exist_media', "The file don't exist");
			return false;
		}
		return true;
	}

	public $title_id = null;
  public function exist_title_name($name){
		$ci = $this->CI;
		$ci->load->Model('M_Title', 'Title');
		$query = array('name'=>trim($name));
		if($this->title_id!=null){
			$query['id!='] = $this->title_id;
		}
		if(count($ci->Title->filter($query))>0){
			$this->set_message('exist_title_name', "The title exist");
			return false;
		}
		return true;
	}

	public $dance_style_id = null;
  public function exist_dance_style_name($name){
		$ci = $this->CI;
		$ci->load->Model('M_DanceStyle', 'DanceStyle');
		$query = array('name'=>trim($name));
		if($this->dance_style_id!=null){
			$query['id!='] = $this->dance_style_id;
		}
		if(count($ci->DanceStyle->filter($query))>0){
			$this->set_message('exist_dance_style_name', "The dance style exist");
			return false;
		}
		return true;
	}

	public $country_id = null;
  public function exist_country_name($name){
		$ci = $this->CI;
		$ci->load->Model('M_Country', 'Countries');
		$query = array('name'=>trim($name));
		if($this->country_id!=null){
			$query['id!='] = $this->country_id;
		}
		if(count($ci->Countries->filter($query))>0){
			$this->set_message('exist_country_name', "The country exist");
			return false;
		}
		return true;
	}

}
