<?php>
	$connection = pg_connect("host=localhost port=5432 dbname=webapp2013 user=postgres password=luningyuan7210");

	$score = $_POST("score");
	$query=sprintf("INSERT INTO score_table SET total_score = %d",$score);
	pg_query($query,$connection);

<?>

