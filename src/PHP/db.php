<?php

//DB connection&schema constants
define('DB_HOST','localhost');
define('DB_PORT','5432');
define('DB_USER','postgres');
define('DB_PASSWORD','luningyuan7210');
define('DB_NAME','webapp2013');
define('Table_REGISTER','table_register');
//establis a connection to DB
if(!$GLOBALS['DB'] = pg_connect("host=%s port=%d dbname=%s user=%s password=%s",DB_HOST,DB_PORT,DB_NAME,DB_USER,DB_PASSWORD)){
	die('Error:Unable to connect the database');
}


?>