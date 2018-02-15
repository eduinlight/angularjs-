<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Upload extends CI_Upload{

	public $user_id;

	public function __construct($config = array()){
		parent::__construct();

		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'gif|jpg|png';
		$config['max_size']     = '2048';
		$this->initialize($config);
	}

	protected function _prep_filename($filename){
		if ($this->mod_mime_fix === FALSE 
			OR $this->allowed_types === '*' 
			OR ($ext_pos = strrpos($filename, '.')) === FALSE){
			return $filename;
		}

		$ext = substr($filename, $ext_pos);
		$filename = substr($filename, 0, $ext_pos);
		return base64_encode(str_replace('.', '_', $filename)).'_'.time().$ext;
	}

	function get_error(){
		if(count($this->error_msg)>0){
			return $this->error_msg[0];
		}
		return '';
	}

	public function do_upload($field = 'userfile'){
		if ( ! parent::do_upload($field)){
			return false;
		}else{
			//cargar el modelo de los medios
			$ci = $this->_CI;
			$ci->load->model('M_Media', 'Media');
			//borrar anteriores imagenes subidas por el usuario que no se hayan usado
			$images = $ci->Media->filter(array('_user'=>$this->user_id, 'used'=>"false"));
			if(count($images)>0){
				foreach($images as $image){
					$this->remove_uploaded($image->id);
				}
			}
			//obtener datos del fichero subido
			$file_data = $this->data();
			//returnar id del recurso
			$media_id = $ci->Media->insert(array(
				'mimetype' => $file_data['file_type'],
				'name' => $file_data['raw_name'],
				'ext' => $file_data['file_ext'],
				'path' => './uploads/' . substr($file_data["full_path"], strlen($file_data["file_path"])),
				'url' => '',
				'date' => time(),
				'_user' => $this->user_id
			));

			$ci->Media->update($media_id, array('url' => 'download/'.$media_id));
			return $media_id;
		}
	}


	public function remove_uploaded($id){
		//cargar el modelo de los medios
		$ci = $this->_CI;
		$ci->load->model('M_Media', 'Media');

		$media = $ci->Media->get($id);
		if($media){
			if(file_exists($media->path))
				unlink($media->path);

			return $ci->Media->delete(array('id' => $id));
		}
		return false;
	}

}
