<?php

$config = array(
  'user' => array(
    array(
      'field' => 'user', 
      'rules' => 'trim|required|valid_user'
    ),
    array(
      'field' => 'pass', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'first_name', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'last_name', 
      'rules' => 'trim|required'
    ),
  ),
);
