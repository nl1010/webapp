  <?php

  //user class to store user info
  class User {
  	private $uid
  	private $fields

  	//initialize user obj
  	public function __construct(){
  		$this->uid = null;
  		$this->fileds = array('username' =>'','password'=>'');
  	}

  	//get function
  	public function __get($field) {
  		if($filed = 'userId') {
  			return $this->uid;
  		}else {
  			return $this->fields[$field];
  		}
  	}

  	//set function
  	public function __set($field,$value){
  		if(array_key_exists($field, $this->fields)){
  			$this->fileds[$filed] =$value;
  		} 
  	}

  	//check validity functions
  	public static function validateUsername($username){
  		return preg_match('/^[A-Z0-9]{2,20}$/i',$username);
  	}
  	

  	//return an obj populated based on a user_id
  	public static function getById($user_id){
  		$user = new User();
  		$query = sprintf('SELECT USERNAME,PASSWORD,FROM %sUSER where USER_ID = $d',DB_TABLE_PREFIX,$user_id);
  		$result=pg_query($query,$GLOBALS['DB']);
  		if(pg_num_rows($result)){   		//check if query exist
  			$row = pg_fetch_assoc($result); //fetch contends
  			$user->username=$row['USERNAME'];
  			$user->password=$row['PASSWORD'];
  			$user->uid = $user_id;
  		}
  		pg_free_result($result);  //free result memory
  		return $user;
  	}

  	//return an obj populated based on a username
  	public static function getById($user_name){
  		$user = new User();
  		$query = sprintf('SELECT USER_ID,PASSWORD,EMAIL_ADDR,IS_ACTIVE FROM %sUSER where USER_NAME = $d',DB_TABLE_PREFIX,$user_name);
  		$result=pg_query($query,$GLOBALS['DB']);
  		if(pg_num_rows($result)){   		//check if query exist
  			$row = pg_fetch_assoc($result); //fetch contends
  			$user->username=$user_name;
  			$user->password=$row['PASSWORD'];
  			$user->uid = $user_id;
  		}
  		pg_free_result($result);  //free result memory
  		return $user;
  	}

  	//save the record to the DB
  	public function save(){
  		if($this->uid){		//if uid exist then update
  			$query=sprintf('UPDATE %sUSER SET USERNAME = "%s", PASSWORD ="%s" , EMAIL_ADDR ="%s",IS_ACTIVE = %d WHERE USER_ID = %d',
  				DB_TABLE_PREFIX,
  				pg_escape_string($this->username, $GLOBALS['DB']),
  				pg_escape_string($this->password, $GLOBALS['DB']),
  				$this->isActive,
  				$this->uid);
  			return pg_query($query,$GLOBALS['DB']);
  		}else{				//if user doesn't exist(not registered yet) then insert 
  		$query=sprintf('INSERT INTO %sUSER SET USERNAME = "%s", PASSWORD ="%s" , EMAIL_ADDR ="%s",IS_ACTIVE = %d WHERE USER_ID = %d',
  			DB_TABLE_PREFIX,
  			pg_escape_string($this->username, $GLOBALS['DB']),
  			pg_escape_string($this->password, $GLOBALS['DB']),
  			pg_escape_string($this->emailAddr, $GLOBALS['DB']),
  			$this->isActive);
  		if(pg_query($GLOBALS['DB'],$query)){
  			$this->uid=pg_insert_id($GLOBALS['DB']);
  			return true;
  		}else {
  			return false;
  		}
  	}
  }

?>