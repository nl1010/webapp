#!/usr/bin/php

<?php  
require ('db.php');


$username = $_POST['username'];
$password = $_POST['password'];

require_once('user.php');
$user_id = User::password_check($username,$password);

?>
