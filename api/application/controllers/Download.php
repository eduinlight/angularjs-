<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/RestService.php');

class Download extends RestService {

	function __construct() {
		parent::__construct();

		$this->load->model('M_Media', 'Media');
		$this->load->helper('download');
	}

	public function index_get($id){
		$media = $this->Media->filter(array('id' => $id));
		if(count($media)>0){
			force_download($media[0]->path, NULL);
		}else{
			$this->not_found();
		}
	}

}
