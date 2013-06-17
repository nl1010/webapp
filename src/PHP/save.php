<?php 

require_once('../Library/PhpConsole.php');
PhpConsole::start(true, true, dirname(__FILE__));

require ('db.php');
require ('player.php');

// $player = new Player();
// $player->uid = $_POST['userid'];
// $player->__set('x',$_POST['x']);
// $player->__set('y',$_POST['x']);
// $player->__set('iron',$_POST['x']);
// $player->__set('x',$_POST['x']);
// $player->__set('x',$_POST['x']);

//$player contains every information from the server
$player=Player:: __save_player_info_to_DB(
	$_POST['userid'],
	$_POST['x'],
	$_POST['y'],
	$_POST['wood'],
	$_POST['crystal'],
	$_POST['iron'],
	$_POST['stone']
);


?>