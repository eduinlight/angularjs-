<?php

$config = array(
  'title' => array(
    array(
      'field' => 'name', 
      'rules' => 'trim|required|exist_title_name'
      )
    ),
  'dance_style' => array(
    array(
      'field' => 'name', 
      'rules' => 'trim|required|exist_dance_style_name'
      )
    ),
  'country' => array(
    array(
      'field' => 'name', 
      'rules' => 'trim|required|exist_country_name'
      )
    ),
  'city' => array(
    array(
      'field' => 'name', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => '_country', 
      'rules' => 'trim|required'
      )
    ),
  'person' => array(
    array(
      'field' => 'first_name', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'last_name', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'email',
      'rules' => 'trim|required|valid_email'
    ),
    array(
      'field' => 'gender',
      'rules' => 'trim|required|valid_gender'
    ),
    array(
      'field' => 'date_born',
      'rules' => 'trim|numeric'
    ),
    array(
      'field' => 'date_dead',
      'rules' => 'trim|numeric'
    ),
    array(
      'field' => 'date_dead',
      'rules' => 'trim|date'
    ),
    array(
      'field' => 'biografy',
      'rules' => 'trim'
    ),
    array(
      'field' => '_city',
      'rules' => 'trim|exist_city'
    ),
    array(
      'field' => '_avatar',
      'rules' => 'trim|exist_media'
    )
  ),
  'venue' => array(
    array(
      'field' => 'name', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'address', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'phone',
      'rules' => 'trim|max_length[32]'
    ),
    array(
      'field' => '_city',
      'rules' => 'trim|required|exist_city'
    ),
  ),
  'school' => array(
    array(
      'field' => 'name', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'address', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'phone',
      'rules' => 'trim|max_length[32]'
    ),
    array(
      'field' => '_city',
      'rules' => 'trim|required|exist_city'
    ),
    array(
      'field' => 'type',
      'rules' => 'trim|required'
    ),
    array(
      'field' => '_avatar',
      'rules' => 'trim|exist_media'
    ),
  ),
  'work' => array(
    array(
      'field' => 'name', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'description', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'premiere_date',
      'rules' => 'trim|required'
    ),
    array(
      'field' => '_premiere_company',
      'rules' => 'trim|required|exist_company'
    ),
    array(
      'field' => '_premiere_venue',
      'rules' => 'trim|required|exist_venue'
    )
  ),
  'company' => array(
    array(
      'field' => 'name', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => '_city',
      'rules' => 'trim|required|exist_city'
    )
  )
);
