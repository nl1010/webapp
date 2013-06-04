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
	$user_id = User::password_check($username,$password);

// 	
// 	$user = User::get_by_name($username);
// 	if($user == false){
// 		echo "user doesn't exist";
// 	}else {
// 		if($password == null) {
// 			echo "password cannot be empty";
// 		} else {
// 			if($user->__get("password")!=$password){
// 				echo "incorrect password please retype again";
// 			}
// 		}
// 	}
	
?>