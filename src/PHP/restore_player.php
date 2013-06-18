<?php 
require_once('../Library/PhpConsole.php');
PhpConsole::start(true, true, dirname(__FILE__));


if(!$GLOBALS['DB'] = pg_connect("host=localhost port=5432 dbname=webapp2013 user=postgres password=luningyuan7210")){
	die('Error:Unable to connect the database </br>');
}

session_start();
$user_id = $_COOKIE['userid'];
require_once('player.php');
$player = Player::restore_player_from_DB_byID($user_id);

// if (isset($_SESSION['wood'])){
// 	$_SESSION['wood'] = 10000;//$player->__get('wood');
// }else $_SESSION['wood'] = 10000;//$player->__get('wood');

			
// echo $_SESSION['wood'];

setcookie('userid',2000,time()+2592000);

?>