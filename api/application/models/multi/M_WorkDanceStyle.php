<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_WorkDanceStyle extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'work_dance_style';
  }

  public function get_works($dance_style_id){
    return $this->get_childs('_dance_style', $dance_style_id, '_work', 'work');
  }

  public function get_dance_styles($work_id){
    return $this->get_childs('_work', $work_id, '_dance_style', 'dance_style');
  }

}
