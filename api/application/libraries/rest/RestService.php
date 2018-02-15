<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once(__DIR__.'/REST_Controller.php');

class RestService extends REST_Controller {

  function __construct() {
    parent::__construct();
  }

  // RESPONSES
  public function token_invalid(){
    @$res->status = 400;
    @$res->message = "El token is inválido";
    $this->response($res, 200);
    die;
  }

  public function not_found(){
    @$res->status = 404;
    @$res->message = "La url no existe";
    $this->response($res, 200);
    die;
  }

  public function data_errors($errors){
    @$res->status = 400;
    @$res->message = "Existen errores en los datos";
    @$res->errors = $errors;
    $this->response($res, 200);
    die;
  }

  public function not_allowed(){
    @$res->status = 501;
    @$res->message = "Usted no tiene acceso al recurso";
    $this->response($res, 200);
    die;
  }

  public function success($data = null){
    @$res->status = 200;
    @$res->data = $data;
    $this->response($res, 200);
    die;
  }

  // JWT
  public function to_jwt($data){
    $this->config->load('jwt');
    return JWT::encode($data, $this->config->item('jwt_key'));
  }

  public function from_jwt($jwt){
    $this->config->load('jwt');
    try{
      return JWT::decode($jwt, $this->config->item('jwt_key'));
    }catch(Exception $e){
      return null;
    }
  }
}
