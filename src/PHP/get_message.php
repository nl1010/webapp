#!/usr/bin/php
<?php 
require ('db.php');
require ('message.php');

$x = $_POST['x'];
$y = $_POST['y'];
echo $x.$y;
$message = Message::__get_message($x,$y);
echo $message;
?>
