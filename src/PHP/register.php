


<?php

	//load debugging lib
	require_once('../Library/PhpConsole.php');
	PhpConsole::start(true, true, dirname(__FILE__));

	//load files
	//require_once('db.php');
	//require_once('user.php');
	//establis a connection to DB
	// if(!$GLOBALS['DB'] = pg_connect("host="%s" port=%d dbname="%s" user="%s" password="%s",DB_HOST,DB_PORT,DB_NAME,DB_USER,DB_PASSWORD")){
	// die('Error:Unable to connect the database');}
	// else echo "success";
	if(!$GLOBALS['DB'] = pg_connect("host=localhost port=5432 dbname=webapp2013 user=postgres password=luningyuan7210")){
	die('Error:Unable to connect the database </br>');
	}else echo "success to connect the database </br>";

	$username = $_POST['username'];
	$password = $_POST['password'];
	require_once('user.php');
	//if(User::validateUsername($username)) echo "valid" else echo "invalid";
// 	if(User::validateUsername($username)){
// 		if ($password == null) echo "password null";
// 		$user = new User();
// 		$user->__set("username",$username);
// 		$user->__set("password",$password);
// 		$user->__get("username");
// 	}else echo "not validate username</br>";
	$user = User::__set_username_password_to_DB($username,$password);
	$user->save();
?>