<?php
#load debugging lib


if(!$GLOBALS['DB'] = pg_connect("host=localhost port=5432 dbname=webapp2013 user=postgres password=luningyuan7210")){
	die('Error:Unable to connect the database </br>');
}
//else echo "success to connect the database </br>";

$username = $_POST['username'];
$password = $_POST['password'];

require_once('user.php');
$user_id = User::password_check($username,$password);

// setcookie("userid",$player->uid);
// setcookie("wood",$player->fields['wood']);
?>
