<?php
//DB connection&schema constants
define('DB_HOST','localhost');
define('DB_USER','postgres');
define('DB_PASSWORD','luningyuan7210');
define('DB_SCHEMA','');
define('DB_TBL_PREFIX','KV_');

//establis a connection to DB
if(!$GLOBALS['DB'] = pg_connect("host=localhost port=5432 dbname=simple_login_page_db user=postgres password=luningyuan7210")){
	die('Error:Unable to connect the database');
}

if(!pg_select($GLOBALS['DB'], table_name, assoc_array)){
	pg_close($GLOBALS['DB']);
	die('Error:Unable to select database schema');
}


?>