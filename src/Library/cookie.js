		function createCookie(name, value, days) {
		  if (days) {
		    var date = new Date();
		    date.setTime(date.getTime()+(days*24*60*60*1000));
		    var expires = "; expires="+date.toGMTString();
		    }
		  else var expires = "";
		  document.cookie = name+"="+value+expires+"; path=/";
		};
		

		function readCookie(name) {
		  var ca = document.cookie.split(';');
		  var nameEQ = name + "=";
		  for(var i=0; i < ca.length; i++) {
		    var c = ca[i];
		    while (c.charAt(0)==' ') c = c.substring(1, c.length); //delete spaces
		    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		  }
		  return "";
		};


		function eraseCookie(name) {
		  createCookie(name, "", -1);
		};
		
		function deleteAllCookies() {
		    var cookies = document.cookie.split(";");

		    for (var i = 0; i < cookies.length; i++) {
		    	var cookie = cookies[i];
		    	var eqPos = cookie.indexOf("=");
		    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		    }
		}