<?php 
require_once('../Library/PhpConsole.php');
PhpConsole::start(true, true, dirname(__FILE__));


if(!$GLOBALS['DB'] = pg_connect("host=localhost port=5432 dbname=webapp2013 user=postgres password=luningyuan7210")){
	die('Error:Unable to connect the database </br>');
}

require 'message.php';
$json = Message::__get_all_message_locations();
echo $json;


?>