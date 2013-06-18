#!/usr/bin/php
<?php 

require ('db.php');


require ('message.php');
$json = Message::__get_all_message_locations();
echo $json;


?>
