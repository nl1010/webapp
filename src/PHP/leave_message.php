#!/usr/bin/php
<?php 
	require ('db.php');
	require ('message.php');
	
	$message = $_POST['message'];
	if ($message != null){
	$x = $_POST['x'];
	$y = $_POST['y'];
	Message::__store_message($x,$y,$message);
	}
?>
