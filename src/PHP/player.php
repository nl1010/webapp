<?php 

#Player class to store current player info
class Player {
	private $uid;
	private $fields;

	#initialize user obj
	public function __construct(){
		$this->uid ='';
		$this->fields = array("wood" =>0,"iron"=>0,"stone"=>0,"crystal"=>0);
	}

	#get function
	public function __get($field) {
		if($field == "user_id") {
			return $this->uid;
		}else {
			return $this->fields[$field];
		}
	}

	#set function
	public function __set($field,$value){
		if(array_key_exists($field, $this->fields)){
			$this->fields[$field] =$value;
		} else echo "field not exist in __set </br>";
	}

	#call this function to initialize player table when registed
	public static function init_player_table ($userid){
		$query=sprintf('INSERT INTO table_player (user_id) VALUES (%d)',pg_escape_string($userid));
		if (pg_query($GLOBALS['DB'],$query)){
			return true;
		}else return false;
	}
	
	#save player info
	public function __save_player_info_to_DB(){
		$userid = readCookie('userid');
		$wood = readCookie('wood');
		$crystal = readCookie('crystal');
		$iron = readCookie('iron');
		$stone = readCookie('stone');
		if ($userid != null ){
				$player = new Player();
				$user->__set("userid",$userid);
				$user->__set("wood",$wood);
				$crystal->__set("crystal",$crystal);
				$iron -> __set("iron",$iron);
				$stone -> __set('stone',$stone);
				$query=sprintf('UPDATE table_register SET wood=%d , crystal=%d , iron=%d , stone=%d WHERE user_id = %d',
						pg_escape_string($player->fields['wood']),
						pg_escape_string($player->fields['crystal']),
						pg_escape_string($player->fields['iron']),
						pg_escape_string($player->fields['stone']),
						pg_escape_string($player->fields['uid'])
				);
				if(pg_query($GLOBALS['DB'],$query)){
					//successfully inserted
					echo "save successful";
					return $user;
				} else
					echo "error to save player's info";
				return false;

		} else {
			echo "error:password needed </br>"; //using ajax -> javascript
			return false;
		}
	}

	#return an obj populated based on a username,if not found obj,then return false
	public static function get_player_info_by_userid($userid){
		$player = new Player();
		$query = sprintf('SELECT * FROM table_player WHERE userid = %d',pg_escape_string($userid));
		$result=pg_query($GLOBALS['DB'],$query);
		if(pg_num_rows($result)!=0){//check if query exist
			$row = pg_fetch_assoc($result); //fetch contends
			$player->userid=$userid;
			$player->fields['wood']=$row['wood'];
			$player->field['iron'] = $row['iron'];
			//add more filed here 
		}else {
			return false;
		}
		return $player;
	}



	}


?>