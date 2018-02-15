<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_VenueWebsite extends MY_Model {

  public function __construct() {
    parent::__construct();

    $this->table = 'venue_website';
  }

  public function get_venues($website_id){
    return $this->get_childs('_website', $website_id, '_venue', 'venue');
  }

  public function get_websites($venue_id){
    return $this->get_childs('_venue', $venue_id, '_website', 'website');
  }

}
