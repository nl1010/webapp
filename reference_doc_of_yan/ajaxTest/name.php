
<?php

if(isset($_POST['name']) ===true && empty ($_POST['name']) === false ){
	require 'connect.php';
	
	$query = pg_query("
			SELECT 'names'.'location'
			FROM 'names'
			WHERE 'names'.'name'=' ".pg_real
			
			")
}


?>