<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('./application/libraries/rest/RestServiceUsers.php');

class Upload extends RestServiceUsers {

	function __construct() {
		parent::__construct();

		$this->load->model('M_Media', 'Media');
		$this->load->helper('download');
	}

	public function index_post(){
		$this->upload->user_id = $this->payload->user_id;
		if(!($id_file  = $this->upload->do_upload('file'))){
			$this->data_errors(array('file' => $this->upload->get_error()));
		}else{
			$media = $this->Media->get($id_file);
			$this->success(array('url' => base_url($media->url), 'id' => $media->id));
		}
	}
}
