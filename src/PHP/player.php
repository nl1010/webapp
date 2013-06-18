<?php 

#Player class to store current player info
class Player {
	private $uid;
	private $fields;

	#initialize user obj
	public function __construct(){
		$this->uid ='';
		$this->fields = array("x"=>0,"y"=>0,"wood" =>0,"iron"=>0,"stone"=>0,"crystal"=>0);
	}

	#get function
	public function __get($field) {
		if($field == "userid") {
			return $this->uid;
		}else {
			return $this->fields[$field];
		}
	}

	#set function
	public function __set($field,$value){
		if($field == 'userid'){
			$this->uid=$value;
		}else {
			if(array_key_exists($field, $this->fields)){
				$this->fields[$field] =$value;
			} else echo "field not exist in __set </br>";
		}
	}

	#call this function to initialize player table --ONLY CALLED WHEN REGISTED
	public static function init_player_table ($userid){
		$query=sprintf('INSERT INTO table_player (user_id,iron,wood,stone,crystal) VALUES (%d,0,0,0,0)',pg_escape_string($userid));
		if (pg_query($GLOBALS['DB'],$query)){
			return true;
		}else return false;
	}

	#save player info
	public static function __save_player_info_to_DB($userid,$x,$y,$wood,$crystal,$iron,$stone){
		if ($userid != null ){
			$player = new Player();
			$player->__set("userid",$userid);
			$player->__set("wood",$wood);
			$player->__set("crystal",$crystal);
			$player -> __set("iron",$iron);
			$player -> __set('stone',$stone);
			$player -> __set('x',$x);
			$player -> __set('y',$y);
			$query=sprintf('UPDATE table_player SET x=%d , y=%d, wood=%d , crystal=%d , iron=%d , stone=%d WHERE user_id = %d',
					pg_escape_string($player->fields['x']),
					pg_escape_string($player->fields['y']),
					pg_escape_string($player->fields['wood']),
					pg_escape_string($player->fields['crystal']),
					pg_escape_string($player->fields['iron']),
					pg_escape_string($player->fields['stone']),
					pg_escape_string($player->uid)
			);
			echo $query;
			if(pg_query($GLOBALS['DB'],$query)){
				//successfully inserted
				//echo "save successful";
				return $player;
			} else
				echo "error to save player's info";
			return false;

		} else {
			echo "error:password needed </br>"; //using ajax -> javascript
			return false;
		}
	}

	#return an obj populated based on a username,if not found obj,then return false
	public static function restore_player_from_DB_byID($userid){
		$player = new Player();
		$query = sprintf('SELECT * FROM table_player WHERE user_id = %d',pg_escape_string($userid));
		$result=pg_query($GLOBALS['DB'],$query);
		if(pg_num_rows($result)!=0){//check if query exist
			$row = pg_fetch_assoc($result); //fetch contents
			$player->__set("userid",$userid);
			$player->__set("wood",$row['wood']);
			$player->__set("crystal",$row['crystal']);
			$player -> __set("iron",$row['iron']);
			$player -> __set('stone',$row['stone']);
			$player -> __set('x',$row['x']);
			$player -> __set('y',$row['y']);
				
				
		
			//add more filed here
			return $player;
		}else {
			return false;
		}

	}

}


?>