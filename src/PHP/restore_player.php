<?php 
require_once('../Library/PhpConsole.php');
PhpConsole::start(true, true, dirname(__FILE__));


if(!$GLOBALS['DB'] = pg_connect("host=localhost port=5432 dbname=webapp2013 user=postgres password=luningyuan7210")){
	die('Error:Unable to connect the database </br>');
}


$user_id = $_POST['user_id'];
require_once('player.php');
$player= new Player();
$player = Player::restore_player_from_DB_byID($user_id);

if ($player!= false){
	$cookie_time = time() + 24*60*60;
	setcookie("wood", $player->__get('wood'), $cookie_time, "/", NULL);
	setcookie("crystal", $player->__get('crystal'), $cookie_time, "/", NULL);
	setcookie("iron", $player->__get('iron'), $cookie_time, "/", NULL);
	setcookie("stone", $player->__get('stone'), $cookie_time, "/", NULL);
	setcookie("x", $player->__get('x'), $cookie_time, "/", NULL);
	setcookie("y", $player->__get('y'), $cookie_time, "/", NULL);
	echo "Login Successful!";
}else echo "Error:check restore_play.php";

// if (isset($_SESSION['wood'])){
// 	$_SESSION['wood'] = 10000;//$player->__get('wood');
// }else $_SESSION['wood'] = 10000;//$player->__get('wood');

			
// echo $_SESSION['wood'];



?>