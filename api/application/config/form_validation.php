<?php

$config = array(
  'user_add' => array(
    array(
      'field' => 'user', 
      'rules' => 'trim|required|valid_user'
    ),
    array(
      'field' => 'first_name', 
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'last_name',
      'rules' => 'trim|required'
    ),
    array(
      'field' => 'pass', 
      'rules' => 'trim|required'
    ),
  ),
  'user_edit' => array(
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
