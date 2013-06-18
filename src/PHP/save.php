#!/usr/bin/php
<?php 

require ('db.php');
require ('player.php');


//$player contains every information from the server
$player=Player:: __save_player_info_to_DB(
	$_POST['userid'],
	$_POST['x'],
	$_POST['y'],
	$_POST['wood'],
	$_POST['crystal'],
	$_POST['iron'],
	$_POST['stone'],
	$_POST['soul']
);


?>
