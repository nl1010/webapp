


<?php
	#load debugging lib
	require_once('../Library/PhpConsole.php');
	PhpConsole::start(true, true, dirname(__FILE__));

	if(!$GLOBALS['DB'] = pg_connect("host=localhost port=5432 dbname=webapp2013 user=postgres password=luningyuan7210")){
	die('Error:Unable to connect the database </br>');
	}
	//else echo "success to connect the database </br>";
	
	$username = $_POST['username'];
	$password = $_POST['password'];
	require_once('user.php');
	$user = new User();
	$user = $user->__set_username_password_to_DB($username,$password);
	
?>