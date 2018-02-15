<?php
/**
 * Created by PhpStorm.
 * User: Lestat
 * Date: 11/04/2016
 * Time: 10:54
 */

function obtener_mes_id($mes){
    $meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return $meses[$mes - 1];
}

function obtener_mes($fecha){
    $meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return $meses[((int) date("n", $fecha)) - 1];
}

function day_start($time){
    return mktime(0,0,0,date("m", $time), date("d", $time), date("Y", $time));
}

function day_end($time){
    return mktime(23,59,59,date("m", $time), date("d", $time), date("Y", $time));
}

function month_start($time){
    return mktime(0,0,0,date("m", $time), 1, date("Y", $time));
}

function month_end($time){
    return mktime(23,59,59,date("m", $time), date("t", $time), date("Y", $time));
}

function year_start($time){
    return mktime(0,0,0,1, 1, date("Y", $time));
}

function year_end($time){
    return mktime(23,59,59,12, 31, date("Y", $time));
}

function console($var){
  echo '<pre>';
  print_r($var);
  echo '</pre>';
}

function media_id($name){
  $ci = &get_instance();
  $ci->load->model('M_Media', 'media');
  $res = $ci->media->filter(array('name' => $name));
  if(count($res)>0)
    return $res[0]->id;
  return null;
}
