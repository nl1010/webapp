
<?php

//user class to store user info
class User {
	private $uid;
	private $fields;

	//initialize user obj
	public function __construct(){
		$this->uid ='';
		$this->fields = array("username" =>'',"password"=>'');
	}

	//get function
	public function __get($field) {
		if($field == "user_id") {
			return $this->uid;
		}else {
			return $this->fields[$field];
		}
	}

	//set function
	public function __set($field,$value){
		if(array_key_exists($field, $this->fields)){
			$this->fields[$field] =$value;
			//printf("value=%s",$this->__get($field));
		} else echo "field not exist in __set </br>";
	}

	public function __set_username_password_to_DB($username,$password){
		if (User::get_by_name($username)) {
			echo "user name exist";
			return false;
		}
		
		if ($password != null ){
			if(User::validateUsername($username)){
				$user = new User();
				$user->__set("username",$username);
				$user->__set("password",$password);
				$query=sprintf('INSERT INTO table_register (username,password) VALUES (\'%s\',\'%s\')',
							pg_escape_string($user->username),
							pg_escape_string($user->password)
					);
				if(pg_query($GLOBALS['DB'],$query)){
						//successfully inserted
						echo "register successful</br>";
						return $user;
					} else
						echo "error to save user name and password to database</br>";
						return false;
			}else {
				echo "error:not a valide username </br>"; //using ajax
				return false;
			}
		} else {
			echo "error:password needed </br>"; //using ajax -> javascript
			return false;
		}
	}

	//check validity functions
	public static function validateUsername($username){
		return preg_match('/^[A-Z0-9]{2,20}$/i',$username);
	}
	

	//return an obj populated based on a user_id
// 	public static function getById($user_id){
// 		$user = new User();
// 		$query = sprintf('SELECT USERNAME,PASSWORD,FROM %sUSER where USER_ID = $d',DB_TABLE_PREFIX,$user_id);
// 		$result=pg_query($query,$GLOBALS['DB']);
// 		if(pg_num_rows($result)){   		//check if query exist
// 			$row = pg_fetch_assoc($result); //fetch contends
// 			$user->username=$row['USERNAME'];
// 			$user->password=$row['PASSWORD'];
// 			$user->uid = $user_id;
// 		}
// 		pg_free_result($result);  //free result memory
// 		return $user;
// 	}

	//return an obj populated based on a username,if not found obj,then return false
	public static function get_by_name($username){
		$user = new User();
		$query = sprintf('SELECT user_id,password FROM table_register WHERE username = \'%s\'',pg_escape_string($username));
		$result=pg_query($GLOBALS['DB'],$query);
		if(pg_num_rows($result)!=0){//check if query exist
			$row = pg_fetch_assoc($result); //fetch contends
			$user->username=$username;
			$user->password=$row['password'];
			$user->uid = $row['user_id'];
		}else {
			return false;
		}
 //free result memory
		return $user;
	}

	//save the record to the DB
// 	public function save(){
// 		$escaped_username= pg_escape_string($this->username);
// 		if($this->username == null) echo "fucking error!";

// 		if($this->uid != null)
// 		{		//if uid exist then update
// 			$query=sprintf('UPDATE table_register SET username = \'%s\', password =\'%s\' WHERE user_id = %d',
// 					Table_REGISTER,
// 					pg_escape_string( $GLOBALS['DB'],$this->username),
// 					pg_escape_string($GLOBALS['DB'],$this->password),
// 					$this->uid);
// 			return pg_query($query,$GLOBALS['DB']);
// 		}
// 		else
// 		{				//if user doesn't exist(not registered yet) then insert
// 			$query=sprintf
// 			('INSERT INTO table_register (username,password) VALUES (\'%s\',\'%s\')',
// 					pg_escape_string($this->username),
// 					pg_escape_string($this->password)

// 			);
// 			if(pg_query($GLOBALS['DB'],$query)){
// 				//successfully inserted
// 				echo $this->username;
// 				return true;
// 			} else
// 				return false;
// 		}
// 	}
}

?>