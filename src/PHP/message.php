<?php
#---class Message------
Class Message{
	private $x;
	private $y;
	private $message;
	
	public function __construct(){
		$this->x = null;
		$this->y = null;
		$this->message = null;
	}
	
	public function __get($field){
		if ($field == "x") {
			return $this->x;
		}else if($field == "y"){
			return $this->y;
		}else if($field == "message"){
			return $this->message;
		}else echo "there is no such field";
	}
	
	public function __set($field,$value){
		if($field == "x"){
			$this->x = $value;
		}else if ($field = "y"){
			$this->y = $value;
		}else if ($field == "message"){
			$this->message=$value;
		}
	}
	
	public static function __get_message($x,$y){
		$query = sprintf('
				SELECT message FROM table_message WHERE x=\'%d\' and y=\'%d\' 
				',
				$x,
				$y);
		$result = pg_query($GLOBALS['DB'],$query);
		if(pg_num_rows($result)!=0){
			$row = pg_fetch_assoc($result);
			$message = $row['message'];
			echo $message;
		} else return false ; #message doesn't exist
	}
	
	//store the message , if message exist then it will add on , if not it will insert a new one
	public static function __store_message($x,$y,$message){
		$pre_message = Message::__get_message($x,$y);
		if ($pre_message != false ) {
			$message = $pre_message.'\n'.$message ;
			$query=sprintf('UPDATE table_message SET message = \'%s\' WHERE x = %d and y = %d',
					pg_escape_string($message),
					pg_escape_string($x),
					pg_escape_string($y)
					);
			if(pg_query($GLOBALS["DB"],$query)){
				echo $message;
			}else echo "something wrong";
		}else {
			$query=sprintf('INSERT INTO table_message (x,y,message) VALUES (\'%d\',\'%d\',\'%s\')',
						pg_escape_string($x),
						pg_escape_string($y),
						pg_escape_string($message)
				);
			if(pg_query($GLOBALS["DB"],$query)){
			echo $message;
			}else echo "something wrong";
		}
	}
	
	#return all message location in the database , this method is server for init the map
	public static function __get_all_message_locations (){
		$query=sprintf('SELECT x,y FROM table_message');
		$result=pg_query($GLOBALS["DB"],$query);
		$rows = array();
		while($r = pg_fetch_assoc($result)) {
			$rows[] = $r;
		}
		return json_encode($rows);
	}
}


?>
