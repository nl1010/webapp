<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
	<head>
		<title><?php echo "I have the info"?></title>
	</head>

	<body>	
		<?php 
		//variables 
		$userID = $_POST ['userID'];
		$password = $_POST ['password'];

		//enable php debugging
		require_once('../Library/PhpConsole.php');
		PhpConsole::start(true, true, dirname(__FILE__));
		//database connection
		$connection = pg_connect("host=localhost port=5432 dbname=simple_login_page_db user=postgres password=luningyuan7210") or die ('could not connect to database');
		//echo "your userID ", $_POST ['userID'], "<br />";
		//echo "your password    ",$_POST ['passWord'],"<br />";
		
		//insert data into database 
		$query_insert=sprintf('INSERT INTO id_and_password ("userID","Password") VALUES (\'%s\',\'%s\')',pg_escape_string($userID),pg_escape_string($password));
		if (pg_query($connection,$query_insert)) {
			echo "uploaded to the database     ";
		}else echo "failed to uploaded     ";

		//popping out data from database 
		$query_fetch = sprintf('SELECT * FROM id_and_password');
		if ($result = pg_query($connection,$query_fetch)) {
			$row = pg_fetch_assoc($result);
			$id = $row['userID'];
			echo $id;
			}else echo "failed to fetch";


		?>
	</body>

</html>