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
	
	public function __get_message($x,$y){
		$query = sprintf('
				SELECT message FROM message_table WHERE x=\'%x\' y=\'%y\' 
				');
		$result = pg_query($GLOBALS['DB'],$query);
		if(pg_num_rows($result)!=0){
			$row = pg_fetch_assoc($result);
			$message = $row['message'];
			return $message;
		}else return false ; #message doesn't exist
	}
	
	
}


?>